const cartschema = require('../model/cartschema')
const productschema = require('../model/productschema')
const couponschema = require('../model/couponschema')
const { populate } = require('dotenv')



const addtocart = async (req, res) => {
    try {

        //checking the user by the token id
        const userid = req.user.id

        //getting the product id
        const productid = req.params.id;

        //find user from cart
        let cart = await cartschema.findOne({ userid });


        //check the product module
        const product = await productschema.findById(productid);

        //check user is already exist
        if (cart) {

            // Check if the product is already in the cart
            const productExists = cart.products.find(item => item.productid.toString() === productid);
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

            //calculating netamount
            cart.Netamount = cart.products.reduce((total, product) => {
                return total + product.totalamount
            }, 0)

            //saving cart
            await cart.save();

            //success 
            return res.status(200).json({ message: 'product added to cart successfully', product: cart })
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
            Netamount: product.price
        });

        //saving to cart
        await newcart.save()


        // response with success
        return res.status(200).json({ message: 'cart added successfully', cart })

    }
    catch (error) {
        //error message
        return res.status(400).json({ message: 'invalid command', error: error.message })

    }
}


const viewcart = async (req, res) => {
    try {
        //takeing userId from the token 
        const userid = req.user.id;

        //find the user from the cart
        const cart = await cartschema.findOne({ userid }).populate('products.productid');

        //check the cart is existing
        if (!cart || !cart.products.length === 0) {
            return res.status(404).json({ message: " No item found in the cart", })
        }

        //success command
        return res.status(200).json({
            message: 'cart shown successfully',
            cart: cart
        });

    } catch (error) {
        //error representation 
        return res.status(500).json({ message: 'server error', error: error.message })
    }
}

const removefromcart = async (req, res) => {
    try {
        const userid = req.user.id;
        const productId = req.params.id;

        // Get the cart
        const cart = await cartschema.findOne({ userid });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the product manually
        cart.products = cart.products.filter(item => item.productid.toString() !== productId);

        // Recalculate Netamount
        cart.Netamount = cart.products.reduce((total, product) => total + product.totalamount, 0);

        // Save changes
        await cart.save();

        return res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        return res.status(400).json({ message: 'Error removing product', error: error.message });
    }
};



const removeAllCart = async (req, res) => {
    try {
        const userid = req.user.id;

        const cart = await cartschema.findOne({ userid });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Clear the cart
        cart.products = [];
        cart.Netamount = 0;
        await cart.save();

        return res.status(200).json({ message: 'All items removed from cart' });
    } catch (error) {
        return res.status(400).json({ message: 'Error clearing cart', error: error.message });
    }
};


const applycoupon = async (req, res) => {
    try {
        //checking from the user id token
        const userid = req.user.id;

        //getting from the body
        const { name } = req.body

        //getting from product id
        const productid = req.params.id

        //finding userid from cartschema
        const cart = await cartschema.findOne({ userid })

        // console.log(cart);

        //finding coupon name from couponschema
        const coupon = await couponschema.findOne({ name })
        console.log(coupon);

        //finding product id from productschema
        const product = await productschema.findById(productid)

        //Extracting product price
        const productPrice = product.price

        //Extracting coupon discount
        const percentage = coupon.discount
      
        //finding product from cart
        const prod = cart.products.find((item) => { return item.productid.toString() === productid })
    
        //calculating discount amount
        const discountAmount = productPrice * percentage / 100

        //implementing the amount to discount
        prod.discount = discountAmount

        //decreasing the discountamount from the total amount
        prod.totalamount -= discountAmount

        //netamount calculation
        cart.Netamount = cart.products.reduce((total, product) => {
            return total + product.totalamount
        }, 0)

        //save to cart
        await cart.save()

        //success message
        return res.status(200).json({ message: 'coupon appled succesfully'
        })
        //error command
    } catch (error) {
        return res.status(500).json({ message: "internal server issue", error: error.message })
    }
}


const updatecartquantity = async (req, res) => {
    try {
        //cheking the user by the token
        const userid = req.user.id;

        //check the product
        const productid = req.params.id;

        //find the user from the cart
        const Cart = await cartschema.findOne({ userid })


        //check the product module
        const product = await productschema.findById(productid);

        //getting the new quantity
        const { quantity } = req.body;

        //validate the quantity 
        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: 'invalid quantity' })
        }

        // const user = await cartschema.find({userid})
        if (!Cart) {
            return res.status(404).json({ message: 'user not found in the cart' })
        }

        //find the product in the cart
        const productcart = Cart.products.find((item) => item.productid.toString() === productid);
        if (!productcart) {
            return res.status(404).json({ message: 'product not found' })
        }

        //total amount calculation
        productcart.quantity = quantity;
        productcart.totalamount = productcart.price * quantity;

        //netamount calculation
        Cart.Netamount = Cart.products.reduce((total, product) => {
            return total + product.totalamount
        }, 0)

        //save the change
        await Cart.save()

        return res.status(200).json({ message: 'cart updated successfully', Cart })

        //error message
        } catch (error) {
        return res.status(500).json({ message: 'servererror' , error: error.message })
    }

}

module.exports = { addtocart, viewcart, removefromcart, updatecartquantity, applycoupon,removeAllCart }