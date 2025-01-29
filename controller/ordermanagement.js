const orderschema = require("../model/orderschema");
const addressschema = require('../model/address')
const cartschema = require('../model/cartschema')
const instance = require('../instance_razorpay');
const nodemailer = require('nodemailer');
const userschema = require("../model/userschema");
require('dotenv').config()

const placeanorder = async (req, res) => {
    try {
        //getting from body
        const { paymentMethod } = req.body;

        //checking the user by the token id
        const userid = req.user.id;

        //finding the userid from schema
        const name = await userschema.findById(userid)

        // checking the address
        const address = await addressschema.findOne({ userid })
        if (!address) {
            return res.status(400).json({
                message: 'need a valid address'
            })
        }

        //checking the payment method
        if (!paymentMethod || [!'COD' || !'OnlinePayment'].includes(paymentMethod)) {
            return res.status(400).json({ message: 'please select any payment method to continue' })
        }

        //checking from the cart
        const cart = await cartschema.findOne({ userid })
        if (!cart || cart.length === 0) {
            return res.status(404).json({ message: ' cart is empty' })
        }

        // making an ordermodel
        const ordermodel = await orderschema({
            userid,
            products: cart.products,
            Netamount: cart.Netamount,
            addresses: address,
            Status: "Pending",
            paymentMethod,
            paymentStatus: "Pending",
        });

        //saving the model
        await ordermodel.save()

        //finding user from order 
        const list = await orderschema.findOne({ userid })

        // Condition for cash on delivery
        if (paymentMethod === 'COD') {
            const transport = nodemailer.createTransport({
                service: "gmail",
                secure: true,
                auth: {
                    user: process.env.MY_GMAIL,
                    pass: process.env.MY_PASSWORD,
                }
            });

            //NodeMailer for the cash on delivery
            const receiver = {
                from: "abhinandh20011@gmail.com",
                to: name.email,
                subject: "Order Confirmation",
                text: `hi ${name.name}, your COD order has been successfully placed rupees of ${cart.Netamount}
                the details ${list}`
            };

            await transport.sendMail(receiver);

            //success message
            return res.status(200).json({ message: 'order has been placed' })

        }

        //Condition for the online Payment
        if (paymentMethod == 'OnlinePayment') {
            const razorpay = instance.orders.create({
                amount: cart.Netamount * 100,
                currency: "INR",
                receipt: ordermodel._id.toString(),
                payment_capture: 1,


                //NodeMailer response throw promise function
            }).then((response) => {
                const transport = nodemailer.createTransport({
                    service: "gmail",
                    secure: true,
                    auth: {
                        user: process.env.MY_GMAIL,
                        pass: process.env.MY_PASSWORD,
                    }
                });

                const receiver = {
                    from: "abhinandh20011@gmail.com",
                    to: name.email,
                    subject: "Order Confirmation",
                    text: `hi ${name.name}, your online order has been successfully placed rupees of ${cart.Netamount}
                     the details ${list} `,
                };

                transport.sendMail(receiver);
                res.status(200).json({ response: " redirect to razorpay", message: 'order has been placed' })
            })

                //error message for the promise function
                .catch((error) => {
                    res.status(400).json(error)
                })
        }

    }
    //error message
    catch (error) {
        return res.status(400).json({ message: 'error in create order', error: error.message })
    }

}

const cancelorder = async (req, res) => {
    try {
        //getting the order id
        const orderid = req.params.id;

        //checking the order
        const order = await orderschema.findById(orderid)
      
        //checking the order has been existing
        if (!order) {
            return res.status(404).json({ message: 'order not found' })

        }

        //only pending order will be cancel
        if (order.Status !== 'Pending') {
            return res.status(400).json({ message: 'only pending order can be cancelled' })
        } else {
            order.Status = "Cancelled"
            res.status(400).json({ message: ' order has been cancelled' })
           
            //save the details
            await order.save()

        }

        //error statement
    } catch (error) {
        return res.status(400).json({ message: 'error occurs' })
    }

}

const vieworder = async (req, res) => {
    try {
        //getting the user details
        const userid = req.user.id

        //find the order id
        const order = req.params.id

        //find the order
        const orderdetails = await orderschema.findById(order)

        //check the order is been existing
        if (!orderdetails) {
            return res.status(404).json({ message: ' order is not found' })

        }
        //order success
        return res.status(200).json({ message: 'order details', orderdetails })

        //error command
    } catch (error) {
        return res.status(400).json({ message: ' error', error: error.message })
    }

}


module.exports = { placeanorder, cancelorder, vieworder }