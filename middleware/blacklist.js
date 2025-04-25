const schema = require('../model/checkblacklist')

const checkblacklist = async (req, res, next) => {
    try {
        //extrating the token
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
       
       //checking the token 
        if (token) {
            const blacklist = await schema.findOne({ token });
            if (blacklist) {
                return res.status(201).json({ message: 'You Need To Login' })
            }
        }
        next();

        //error statement
    } catch (error) {
        console.error("Blacklist check error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

};

module.exports = checkblacklist