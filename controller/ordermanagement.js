const orderschema = require("../model/orderschema");

const placeanorder = async (req,res) => {
    try {
        //getting from body
        const{
            address,
            product,
            Netamount,
            paymentMethod
           } = req.body;
        const userid = req.user;


        // check the feild
        if ( !address ) { 
            return res.status(400).json({
                message: 'require all the feilds'
            })
        }

        //checking the payment method
        if (!paymentMethod || [!'COD' || !'Online payment'].includes(paymentMethod)) {
            return res.status(400).json({message: 'please select any payment method to continue'})
        }

        const ordermodel = await orderschema ({
            address,
            product,
            Netamount,
            totalPriceAfterDiscount,
            paymentInfo
        });

        await ordermodel.save()
        return res.status(200).json({message:'order has been created'})
        
    } catch (error) {
         //error message
         return res.status(400).json({message: 'error in create order',error:error.message
         })
    }   
    
}

module.exports = placeanorder