const productschema = require('../model/productschema')



const addproduct = async (req, res) => {
    try {
      const { product_name, description, price, category, stock,rating } = req.body;
  
      const imagePaths = req.files ? req.files.map(file => `/upload/${file.filename}`) : [];

  
      // Create new product
      const product = new productschema({
        product_name,
        description,
        price,
        category,
        stock,
        rating,
        image: imagePaths
      });
  
      await product.save();
  
      return res.status(201).json({
        message: 'Product added successfully',
        product
      });
  
    } catch (error) {
      console.error('Error adding product:', error);
      return res.status(500).json({ message: 'Failed to add product',error });
    }
  };



const updateproduct = async (req, res) => {
    try {
        //taking from params
        const productid = req.params.id;

        //getting from the body
        const update = req.body;

        //checking the productId
        if (!productid) {
            return res.status(404).json({ message: "product id is required" })
        }

        //find from schema and update
        const updateproduct = await productschema.findByIdAndUpdate(productid, update);

        //checking the condition
        if (!updateproduct) {
            return res.status(400).json({ message: "cannot update the product" });
        }
        res.status(200).json({ message: "updated successfully" });


        //error message
    } catch (error) {
        res.status(400).json({ message: "invalid product" })

    }

}



const deleteproduct = async (req, res) => {

    try {
        //taking from params
        const productid = req.params.id;

        //checking the productId
        if (!productid) {
            return res.status(404).json({ message: "product id is required" })
        }

        //find from schema and delete
        const deleteproduct = await productschema.findByIdAndDelete(productid)

        //checking the condition
        if (!deleteproduct) {
            return res.status(400).json({ message: 'product cannot been deleted' });
        }
        return res.status(200).json({ message: 'product deleted successfully' });

        //error message
    } catch (error) {
        return res.status(404).json({ message: 'invalid command' })

    }

}

const viewproduct = async (req, res) => {
    try {
        //finding from schema
        const products = await productschema.find({})

        //checking the condition
        if (!products) {
            return res.status(404).json({ message: 'product not found' });
        }
        return res.status(200).json({ message: 'All the products are here', products });

        //error message
    } catch (error) {
        return res.status(400).json({ message: 'invalid command' })
    }

}


const viewproductid = async (req, res) => {
    try {
        //taking from params
        const productid = req.params.id;

        //finding from schema
        const products = await productschema.findById(productid)

        //checking the condition
        if (!products) {
            return res.status(404).json({ message: 'product not found' });
        }
        return res.status(200).json({ message: 'The products', products });

        //error message
    } catch (error) {
        return res.status(400).json({ message: 'invalid command',error:error.message })

    }

}

module.exports = { addproduct, updateproduct, deleteproduct, viewproduct, viewproductid }