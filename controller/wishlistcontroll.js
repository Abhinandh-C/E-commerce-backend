const wishlistschema = require('../model/wishlistschema')
const productschema = require('../model/productschema')
const userschema = require('../model/userschema')
const { populate }= require('dotenv')

const addwishlist = async (req,res) => {
     try {

    //checking the user by the token id
    const userid = req.user.id

    
    //getting the product id
    const productid = req.params.id;
    
    
  
    //Import user model schema
    const user =await userschema.findById(userid);
   

    //check the product module
    const product = await productschema.findById(productid);

    const wishlistmodel = await wishlistschema({
        userid: user,
        productid: product 
    });

    //find user from wishlist 
    const wishlist = await wishlistschema.findOne({userid})
 

    //check user is already exist
    if (wishlist) {
        
    //check the product is already exist in wishlist
    if(wishlist.productid.includes(productid)){
        return res.status(400).json({message: 'product is already in wishlist'})
    }

    //if not add product to wishlist
    wishlist.productid.push(productid)
    await wishlistschema.findByIdAndUpdate(wishlist,{productid: wishlist.productid})

    //success 
    return res.status(200).json({message: 'product added to wishlist successfully',product: wishlist})
    }

    //if no existing wishlist is found,save the new wishlist
    await wishlistmodel.save()

    // response with success
    return res.status(200).json({message: 'wishlist added successfully'})

     } 
     catch (error) {
    
    //error message
    return res.status(400).json({message: 'invalid command'})
        
     }
}


const viewwishlist = async (req,res) => {
     try {
        //takeing userId from the token 
        const userid = req.user.id
        
        
        //find the user from the wishlist
        const wishlist = await wishlistschema.findOne({userid:userid}).populate('productid');
        
        
        //check the wishlist is existing
        if (!wishlist || wishlist.productid.length === 0) {
            return res.status(404).json({message: " No item found in the wishlist"})
        }

        //success command
        return res.status(200).json({message: 'wishlist shown successfully',
            wishlist: wishlist.productid
        });


    } catch (error) {

        //error representation 
        return res.status(500).json({message: 'server error',error: error.message})
       
        
    }
}

const removefromwishlist = async (req,res) => {
    try {
         //checking the user by the token id
         const userid = req.user.id;

        
    
         //getting the product id
         const productId = req.params.id;

        
         //find user's wishlist 
         const wishlist = await wishlistschema.updateOne({ userid},{$pull:{productid:productId}})
        return res.status(200).json({message: 'product removed from wishlist '})

        
    } catch (error) {
        
        //error statement
        return res.status(400).json({message: 'error',error})
    }
}
    



module.exports = {addwishlist,viewwishlist,removefromwishlist}