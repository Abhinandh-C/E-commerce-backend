const cartschema = require('../model/cartschema')
const productschema = require('../model/productschema')
const { populate }= require('dotenv')


const addtocart = async (req,res) => {
        try {
   
       //checking the user by the token id
       const userid = req.user.id
   
       
       //getting the product id
       const productid = req.params.id;
       
       
     
    //find user from cart
       let cart =await cartschema.findOne({userid});
      
   
       //check the product module
       const product = await productschema.findById(productid);

    
   
       //check user is already exist
       if (cart) {
           
       // Check if the product is already in the cart
       const productExists = cart.products.find(item => item.productid.toString()=== productid);
       if (productExists) {
           return res.status(400).json({ message: 'Product is already in the cart' });
       }

   
       //if not add product to wishlist
       cart.products.push({
        productid,
        quantity: 1,
        price: product.price,
        totalamount: product.price,
       });

       await cart.save();
      
       //success 
       return res.status(200).json({message: 'product added to cart successfully',product: cart})
       }

          // If no cart exists, create a new one
         const newcart = new cartschema({
            userid,
            products: [{
                productid,
                quantity: 1,
                price: product.price,
                totalamount: product.price,
            }], 
        });
    
        await newcart.save()
            
   
       // response with success
       return res.status(200).json({message: 'cart added successfully',cart})
    
        }
        catch (error) {
       
       //error message
       return res.status(400).json({message: 'invalid command',error})
           
        }
   }
   

   const viewcart = async (req,res) => {
        try {
           //takeing userId from the token 
           const userid = req.user.id;

           
              //find the user from the cart
              const cart = await cartschema.findOne({userid}).populate('products.productid');
           
           //check the cart is existing
           if (!cart || !cart.products.length === 0) {
               return res.status(404).json({message: " No item found in the cart",})
           }
         
   
           //success command
           return res.status(200).json({message: 'cart shown successfully',
               cart: cart.products
           });
   
   
       } catch (error) {
   
           //error representation 
           return res.status(500).json({message: 'server error',error: error.message})
          
           
       }
   }

   const removefromcart = async (req,res) => {
       try {
            //checking the user by the token id
            const userid = req.user.id;
   
           
       
            //getting the product id
            const productId = req.params.id;
   
           
            //find user's cart
            const cart = await cartschema.findOneAndUpdate({userid},{$pull:{products:{productid:productId}}})
           return res.status(200).json({message: 'product removed from cart '})

           
       } catch (error) {
           
           //error statement
           return res.status(400).json({message: 'error',error})
       }
    }


    const updatecartquantity = async (req,res) => {
        try {
            //cheking the user by the token
            const userid = req.user.id;

            //check the product
            const productid = req.params.id;

            //find the user from the cart
            const Cart = await cartschema.findOne({userid})
          
            
            //check the product module
            const product = await productschema.findById(productid);

            //getting the new quantity
            const { quantity } = req.body;

            //validate the quantity 
            if (!quantity || quantity<1) {
                return res.status(400).json({message: 'invalid quantity'})   
            }
            
            // const user = await cartschema.find({userid})
            if (!Cart) {
                return res.status(404).json({message:'user not found in the cart'})
            }

            //find the product in the cart
            const productcart = Cart.products.find((item) => item.productid.toString()===productid);
            if (!productcart) {
                return res.status(404).json({message: 'product not found'})
            }

            //total amount calculation
            productcart.quantity = quantity;
                productcart.totalamount = productcart.price*quantity;

                Cart.Netamount = Cart.products.reduce((total,product)=>{
                    return total+product.totalamount
                },0)

            //save the change
            await Cart.save()

            return res.status(200).json({message:'cart updated successfully',Cart})
        
        
        } catch (error) {
         
        //error message
        console.error(error);
        
        return res.status(500).json({message: 'servererror'
            ,error: error.message
        })
        }
        
    }

   module.exports = {addtocart,viewcart,removefromcart,updatecartquantity}