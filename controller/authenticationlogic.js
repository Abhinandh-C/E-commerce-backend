const userschema = require('../model/userschema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const cookieparser = require('cookie-parser')



const signup = async(req,res)=>{
    try {
            //get all data from body
            const {name,email,password,Mobile,Gender} = req.body
    
      
             //all the data should exists
             if (!(name && email && password && Mobile && Gender)) {
            res.status(400).send('all the feild are compulsory')
          }
         
             //check the user is already exists
             const userexist = await userschema.findOne({email})
            if (userexist){
            res.status(409).send('user already exist')
          } 
            //encrypt the password
            const encryptpassword = await bcrypt.hash(password,8)   
          
          
            //save the user in DB
            const user = await userschema.create({
              name,
              email,
              Mobile,
              Gender,
              password: encryptpassword
          })

             //generate a token for a user 
             const token = jwt.sign(
            {id: user._id},
            'shhhh', // proccess.env.jwtsecret
            {
             expiresIn: "2h"
          }
             );
             user.token = token 
            user.password = undefined

            res.status(201).json({message: user,
              token
            })


    }
    catch(error) {
            console.log('error in signup',error);
            
          }
} 


const login = async (req,res) => {

    try{
          //get all data
          const {email,password} = req.body

          //validation
          if(!(email && password)){
            res.status(400).send('send all data')
          }
          //find user in DB
          const user = await userschema.findOne({email})
          
          //user was not exist
          if(!user){
            res.status(404).send("user was not exist")
          }
          
          //match they password
        if  (user && (await bcrypt.compare(password, user.password)))
        { 
            const token = jwt.sign(
                {id: user._id,},
                process.env.JWT_secret_key,
                {
                    expiresIn: "2h"
                }
            );
            user.token = token
            user.password =  undefined

          //Admin signin
        if (user.role =='admin') {
          const token = jwt.sign(
            {id: user._id},
            process.env.JWT_secret_key,
            {
                expiresIn: "2h"
            } 
        );
            return res.status(200).send({message:"admin login successfully",
              token
            })
          }
        

            // cookie section
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httponly: true
            };
            res.status(200).cookie("token",token,options).json({
                success: true,
                token
                
            })
            res.status(201).json(user)
        }

        

        
          
    
          
    } catch  (error) {
        console.log('error in login',error);
        
    }
    
}
module.exports = {signup,login}
