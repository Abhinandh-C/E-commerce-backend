const userschema = require('../model/userschema');
const addressschema = require('../model/address')
const bcrypt = require('bcrypt')


const Createprofile = async (req, res) => {
    try {
        //fecting the user
        const userid = req.user.id

        // getting from body
        const { firstName,email, PhoneNumber, address, city, state, pincode, country } = req.body;

        //checking the phone number is valid or not
        if (PhoneNumber.length !== 10) {
            return res.status(400).json({ message: 'please sent a valid phone number' })

        }

        //checking the data
        if (!firstName || !email || !PhoneNumber || !address || !city || !state || !pincode || !country) {
            return res.status(400).json({ message: 'require all the feilds' })
        }

        //find the user from the schema
        const profile = await userschema.findById(userid)

        //making a new model
        const Profile = await addressschema({
            userid,
            firstName,
            email,
            PhoneNumber,
            address,
            city,
            state,
            pincode,
            country

        })

        //save the model
        await Profile.save();
        return res.status(201).json({ message: 'profile has been created' })

        //error
    } catch (error) {
        return res.status(400).json({ message: 'error found' })
    }

}

const viewuserprofile = async (req, res) => {
    try {
        //checking the token
        const userid = req.user.id;

        //feching the details
        const user = await addressschema.findOne({ userid })

        //checking the user exit
        if (!user) {
            return res.status(404).json({ message: " user not found" })
        }
        return res.status(200).json({ message: " user Details", user })

        //error staement
    } catch (error) {
        return res.status(400).json({ message: "invalid command" })

    }
}

const deleteprofile = async (req, res) => {
    try {
        //taking user from params
        const userid = req.params.id;
        
        //finding user and delete
        const user = await schema.findByIdAndDelete(userid)

        //success command
        return res.status(200).json({ message: "The user has been deleted", user })

        //error command
    } catch (error) {
        return res.status(400).json({ message: "invalid command" })
    }

}


const changepassword = async (req, res) => {
    try {
        //fecting the user
        const userid = req.user.id

        // getting from body
        const { currentpassword, newpassword } = req.body;

        //find the user
        const user = await userschema.findById(userid)

        //checking the user exit
        if (!user) {
            return res.status(404).json({ message: " user not found" })
        }

        //compareing the password
        const password = await bcrypt.compare(currentpassword, user.password)

        //checking user is to be existing
        if (!password) {
            return res.status(404).json({ message: 'password was incorrect' })

        }

        //hashing password
        const hash = await bcrypt.hash(newpassword, 10)
        user.password = hash

        //save the password
        await user.save()

        //success command
        return res.status(200).json({ message: 'password has been changed ' })

        //error   
    } catch (error) {
        return res.status(400).json({ message: "invalid command", error: error.message })
    }

}


module.exports = { viewuserprofile, deleteprofile, Createprofile, changepassword }