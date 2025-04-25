const user = require('../model/userschema')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
const bcrypt = require('bcrypt');
const userschema = require('../model/userschema');
env.config()

const resetpassword = async (req, res) => {

    try {

        //get the data
        const { token } = req.params.token;
        const { password } = req.body;

        //password checking
        if (!password) {
            return res.status(400).send({ message: "please provide password" })
        }

        //find the user
        const user = await userschema.findOne({ token })

        //checking the user
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        //encrypt the password
        const newhashpassword = await bcrypt.hash(password, 8);

        //update the user password
        user.password = newhashpassword;

        //save the changes
        await user.save();

        //success command
        return res.status(200).send({ message: "password reset successfully" })

        //error command
    } catch (error) {
        return res.status(400).json({message: 'invalid command'})
    }

}


module.exports = resetpassword