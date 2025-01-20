const schema = require('../model/productschema')



const getproduct = async (req, res) => {
    try {
        //find the product
        const products = await schema.find({})

        //checking the condition
        if (!products) {
            return res.status(404).json({ message: 'product not found' });
        }
        return res.status(200).json({ message: 'All the products are here', products });

        //error statement
    } catch (error) {
        return res.status(400).json({ message: 'invalid command' })

    }
}


const singleproduct = async (req, res) => {
    try {
        //checking from the params
        const productid = req.params.id;

        // finding the product id
        const products = await schema.findById(productid)

        //checking the condition
        if (!products) {
            return res.status(404).json({ message: 'product not found' });
        }
        return res.status(200).json({ message: 'The products', products });

        //error statement
    } catch (error) {
        return res.status(400).json({ message: 'invalid command' })

    }

}

module.exports = { getproduct, singleproduct }