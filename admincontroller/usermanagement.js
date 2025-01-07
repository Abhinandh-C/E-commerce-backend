const Schema = require('../model/userschema')


const viewuser = async (req,res) => {
    try {
        const user = await Schema.find({})

        if (!user) {
            return res.status(404).json({message: "user was not found in the database"})
        }
        return res.status(200).json({message: "List of the users",user})

        
        } catch (error) {
            return res.status(400).json({message: "invalid command"})
        
    }
    
}


const viewsingleuser = async (req,res) => {
    try {
        const userid = req.params.id;
        const user = await Schema.findById(userid)
       
        if (!user) {
            return res.status(404).json({message: "user was not found in the database"})
        }
        return res.status(200).json({message: "List of the users",user})


    } catch (error) {
        return res.status(400).json({message: "invalid command"})
    }
    
}

const deleteuser = async (req,res) => {
    try {
        const userid = req.params.id;
        const user = await Schema.findByIdAndDelete(userid)

 
        if (!user) {
            return res.status(404).json({message: "user was not found "})
        }
        return res.status(200).json({message: "The user has been deleted",user})

        
    } catch (error) {
        return res.status(400).json({message: "invalid command"})
    }
    
}


const blockuser = async (req,res) => {
    try {
        const userid = req.params.id;
        await Schema.findByIdAndUpdate(userid,{active:false})
        
        
        if (!user) {
            return res.status(404).json({message: "user was not found "})
        }
        return res.status(200).json({message: "The user has been Blocked",user})

    } catch (error) {
        return res.status(400).json({message: "invalid command"})
    }
    
}
    
const viewblockuser = async (req,res) => {
    try {
        const blockuser = await Schema.find({active:false})
        
        if (!blockuser) {
            return res.status(404).json({message: "not found "})
        }
        return res.status(200).json({message: "Blocked users",blockuser})

    } catch (error) {
        return res.status(400).json({message: "invalid command"})
    }
    
}


module.exports={viewuser,viewsingleuser,deleteuser,blockuser,viewblockuser}


    
