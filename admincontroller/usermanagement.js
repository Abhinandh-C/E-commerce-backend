const Schema = require('../model/userschema')


const viewuser = async (req, res) => {
    try {
        //find from schema
        const user = await Schema.find({})

        //checking the user
        if (!user) {
            return res.status(404).json({ message: "user was not found in the database" })
        }
        return res.status(200).json({ message: "List of the users", user })

        //error message
    } catch (error) {
        return res.status(400).json({ message: "invalid command" })
    }

}


const viewsingleuser = async (req, res) => {
    try {
        //taking from params
        const userid = req.params.id;

        //finding userId from schema
        const user = await Schema.findById(userid)

        //checking the user
        if (!user) {
            return res.status(404).json({ message: "user was not found in the database" })
        }
        return res.status(200).json({ message: "List of the users", user })

        //error message
    } catch (error) {
        return res.status(400).json({ message: "invalid command" })
    }

}

const deleteuser = async (req, res) => {
    try {
        //taking from params
        const userid = req.params.id;

        //finding userID and delete from schema
        const user = await Schema.findByIdAndDelete(userid)

        //checking the user
        if (!user) {
            return res.status(404).json({ message: "user was not found " })
        }
        return res.status(200).json({ message: "The user has been deleted", user })

        //error message
    } catch (error) {
        return res.status(400).json({ message: "invalid command" })
    }

}


const blockuser = async (req, res) => {
    try {
        //taking from params
        const userid = req.params.id;

        //find userID from schema and update to active false
        await Schema.findByIdAndUpdate(userid, { active: false })

        //checking the user
        if (!user) {
            return res.status(404).json({ message: "user was not found " })
        }
        return res.status(200).json({ message: "The user has been Blocked", user })

        //error message
    } catch (error) {
        return res.status(400).json({ message: "invalid command" })
    }

}

const viewblockuser = async (req, res) => {
    try {
        //find active : false , in  schema
        const blockuser = await Schema.find({ active: false })

        //checking the blockuser
        if (!blockuser) {
            return res.status(404).json({ message: "not found " })
        }
        return res.status(200).json({ message: "Blocked users", blockuser })

        //error message
    } catch (error) {
        return res.status(400).json({ message: "invalid command" })
    }

}


module.exports = { viewuser, viewsingleuser, deleteuser, blockuser, viewblockuser }



