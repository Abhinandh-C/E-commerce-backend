const schema = require('../model/userschema')

const viewuserprofile = async (req,res) => {
      try {
        const userid = req.params.id;
            const user = await schema.findById(userid)
    
            return res.status(200).json({message: " user Details",user})
    
            
            } catch (error) {
                return res.status(400).json({message: "invalid command"})
            
        
            }
}

const deleteprofile = async (req,res) => {
    try {
        const userid = req.params.id;
        const user = await schema.findByIdAndDelete(userid)

        return res.status(200).json({message: "The user has been deleted",user})

        
    } catch (error) {
        return res.status(400).json({message: "invalid command"})
    }
    
}


const updateprofile = async (req,res) => {
    try {
        
    } catch (error) {

        return res.status(400).json({message: "invalid command"})
    }

}


module.exports = {viewuserprofile,deleteprofile,updateprofile}