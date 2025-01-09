const couponschema = require('../model/couponschema')



const createcoupon = async (req,res) => {
    try {
        //getting from the body
        const {
            name,
            expiry,
            discount
         } = req.body;
         

         // check the feild
         if (!name || !expiry || !discount) {
            return res.status(400).json({
                message: 'require all the feilds'
            })
            
         }

         //checking the coupon exiting 
         const existingCoupon = await couponschema.findOne({ name });
        if (existingCoupon) {
            return res.status(400).json({
                message: 'A coupon with this name already exists.',
            });
        }

         const model = await couponschema({
            name,
            expiry,
            discount
         });

         await model.save()
        return res.status(200).json({message:'coupon has been created'})

    } catch (error) {
        //error message
        return res.status(400).json({message: 'error in create coupon',error:error.message
        })
    }
    
}

const viewcoupon = async (req,res) => {
     try {
            const coupon = await couponschema.find({})
            if (!coupon) {
                return res.status(404).json({message: 'coupon not found'});
            }
            return res.status(200).json({message: 'All the coupons are here',coupon});
            
        } catch (error) {
            return res.status(400).json({message: 'invalid command'})
            
        }
}

const updatecoupon = async (req,res) => {
    try {
        const couponid = req.params.id;
        const update = req.body;

        if (!couponid) {
            return res.status(404).json({message: "coupon id is required"})
        }

        const updatecoupon = await couponschema.findByIdAndUpdate(couponid,update);
        if (!updatecoupon) {
            return res.status(400).json({message: "cannot update the coupon"});
        }
        res.status(200).json({message: "updated successfully"});


        
         } catch (error) {
       res.status(400).json({message: "invalid product"})
        
    }
    
}


const deletecoupon = async (req,res) => {
    
    try {
        const couponid = req.params.id;

        if (!couponid) {
            return res.status(404).json({message: "coupon id is required"})
        }
        
        const deletecoupon = await couponschema.findByIdAndDelete(couponid)
        if (!deletecoupon) {
            return res.status(400).json({message: 'coupon cannot been deleted'});
        }
        return res.status(200).json({message: 'coupon deleted successfully'});

        
    } catch (error) {
        return res.status(404).json({message: 'invalid command'})
        
    }
    
}

module.exports ={ createcoupon,viewcoupon,updatecoupon,deletecoupon}

