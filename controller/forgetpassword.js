
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const env = require('dotenv');
const userschema = require('../model/userschema');
env.config()



const forgetpassword = async (req, res) => {
  try {

    //taking from body
    const { email } = req.body;

    //check the mail is vaild
    if (!email) {
      return res.status(400).send('please provide a email ')
    }

    //check the user
    const checkuser = await userschema.findOne({ email });

    //check the user is already exist
    if (!checkuser) {
      return res.status(404).send('user not found')
    }
    
    //token
    const token = jwt.sign({ email }, process.env.JWT_secret_key, {
      expiresIn: "1h",
    });

    //setting email for sent email to the client
    const transport = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      }
    });

    //sent mail
    const receiver = {
      from: "abhinandh20011@gmail.com",
      to: email,
      subject: "password Reset Request",
      text: `Click on the link to generate your new password ${process.env.RESET_PASSWORD}${token}`,
    };

    await transport.sendMail(receiver);
    checkuser.token = token

    //save the new checkuser
    await checkuser.save()

    //success message
    return res.status(200).
      send({ message: "password reset link sent successfully on your gmail account", })

    //error command
  } catch (error) {
    return res.status(500).json({message : 'error in forgetpassword'})
  }

};


module.exports = forgetpassword