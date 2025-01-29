const couponschema = require('../model/couponschema')



const createcoupon = async (req, res) => {
    try {
        //getting from the body
        const {
            name,
            expiry,
            discount
        } = req.body;


        // check the feild
        if (!name || !expiry || !discount) {
            return res.status(400).json({message: 'require all the feilds'})

        }

        //checking the coupon exiting 
        const existingCoupon = await couponschema.findOne({ name });

        //checking for existing
        if (existingCoupon) {
            return res.status(400).json({ message: 'A coupon with this name already exists.'});
        }

        //creating a new model
        const model = await couponschema({
            name,
            expiry,
            discount
        });

        //saving the new model
        await model.save()

        //success message
        return res.status(200).json({ message: 'coupon has been created' })

        //error message
    } catch (error) {
           return res.status(400).json({  message: 'error in create coupon', error: error.message })
    }

}




const viewcoupon = async (req, res) => {
    try {
        //finding from schema
        const coupon = await couponschema.find({})

        //checking the coupon
        if (!coupon) {
            return res.status(404).json({ message: 'coupon not found' });
        }
        return res.status(200).json({ message: 'All the coupons are here', coupon });

        //error message
    } catch (error) {
        return res.status(400).json({ message: 'invalid command' })
    }
}



const updatecoupon = async (req, res) => {
    try {
        //taking from params
        const couponid = req.params.id;

        //getting from the body
        const update = req.body;

        //checking the coupon
        if (!couponid) {
            return res.status(404).json({ message: "coupon id is required" })
        }

        //find from schema and updateing
        const updatecoupon = await couponschema.findByIdAndUpdate(couponid, update);

         //checking the function
        if (!updatecoupon) {
            return res.status(400).json({ message: "cannot update the coupon" });
        }
        res.status(200).json({ message: "updated successfully" });

        //error message
    } catch (error) {
        res.status(400).json({ message: "invalid product" })

    }

}


const deletecoupon = async (req, res) => {

    try {
        //taking from params
        const couponid = req.params.id;

        //checking the coupon
        if (!couponid) {
            return res.status(404).json({ message: "coupon id is required" })
        }

        //find from schema and delete
        const deletecoupon = await couponschema.findByIdAndDelete(couponid)

        //checking the function
        if (!deletecoupon) {
            return res.status(400).json({ message: 'coupon cannot been deleted' });
        }
        return res.status(200).json({ message: 'coupon deleted successfully' });

        //error message
    } catch (error) {
        return res.status(404).json({ message: 'invalid command' })

    }

}

module.exports = { createcoupon, viewcoupon, updatecoupon, deletecoupon }

