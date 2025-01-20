const jsonwebtoken = require('jsonwebtoken')


function verifyToken(req, res, next) {
    //extract authorized header
    const authheader = req.header('Authorization')

    //extract token
    const token = authheader.split(' ')[1];

    //checking the token
    if (!token) { return res.send('token not found') }

    //verify the token
    jsonwebtoken.verify(token, process.env.JWT_secret_key, (err, decoder) => {
        
        //error checking
        if (err) {
            return res.status(400).json({ message: "error in token verify" })

        }
        //attaching the user id in the decoder
        req.user = decoder

        //passing to the next middleware
        next()
    })

}

module.exports = verifyToken 