const user = require('../model/userschema')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
const bcrypt = require('bcrypt');
const userschema = require('../model/userschema');
env.config()

const resetpassword= async (req,res) => { 

    try {

         //get the data
         const {token} = req.params.token;
         const {password} = req.body;

         //password checking
         if(!password){
         return res.status(400).send({message: "please provide password"})
         }  
         
         //decode the token
        //  const decoded = jwt.verify(token,process.env.JWT_secret_key)

         //find the user
         const user = await userschema.findOne({token})
         if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        //encrypt the password
         const newhashpassword = await bcrypt.hash(password,8);

         //update the user password
         user.password = newhashpassword ;
         await user.save();

         return res.status(200).send({message: "password reset successfully"})

       
    } catch (error) {
       console.log(error)
    }
    
}


module.exports = resetpassword