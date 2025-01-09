const jsonwebtoken = require('jsonwebtoken')


function verifyToken (req,res,next){
    const authheader = req.header('Authorization')

  
    const token = authheader.split(' ') [1];
    if(!token){return res.send('token not found')}


 jsonwebtoken.verify(token,process.env.JWT_secret_key,(err,decoder)=>{
    if (err) {
        return res.status(400).json({
            message:"error in token verify"
        })
        
    }
    console.log(decoder);
    
    req.user = decoder
    next()
})

}

module.exports = verifyToken 