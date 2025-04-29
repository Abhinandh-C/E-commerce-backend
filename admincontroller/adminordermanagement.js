const orderschema = require('../model/orderschema')



const deleteorder = async (req, res) => {
    try {
        //checking the userid
        const orderid = req.params.id

        //checking the order
        const order = await orderschema.findByIdAndDelete(orderid)
        return res.status(200).json({ message: 'order has been deleted' })

        //error handling    
    } catch (error) {
        return res.status(400).json({ message: 'something went wrong' })
    }

}

const viewallorder = async (req, res) => {
    try {
        //getting the user details
        const userid = req.user.id


        //find the order
        const orderdetails = await orderschema.find()
        .populate('address') // <-- Populates address details
        .populate('products.productid') // optional: populate product info too
        .exec();
        //check the order is been existing
        if (!orderdetails) {
            return res.status(404).json({ message: ' order is not found' })

        }
        //order success
        return res.status(200).json({ message: 'order details', orderdetails })

        //error 
    } catch (error) {
        return res.status(400).json({ message: ' error', error: error.message })
    }

}


const updatestatus = async (req, res) => {
    try {
        //check the order
        const orderId = req.params.id

        //getting from the body
        const { Status } = req.body;

        //check the order
        if (!orderId) {
            return res.status(404).json({ message: "order not found" })
        }

        //find and update
        const update = await orderschema.findByIdAndUpdate(orderId,
            { Status },
            { new: true }
        );

        //checking the condition
        if (!update) {
            return res.status(400).json({ message: "cannot update the coupon" });
        }
        res.status(200).json({ message: "updated successfully", update });

        //error command
    } catch (error) {
        res.status(400).json({ message: "failed to update ", error: error.message })
    }

}

module.exports = { deleteorder, viewallorder, updatestatus }