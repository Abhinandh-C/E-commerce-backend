const schema = require('../model/productschema')


const allcategory = async (req, res) => {
    try {
        //extrating  category from query parameter
        const { category } = req.query;

        //filter object creating
        const filter = {};

        //filter
        if (category) {
            filter.category = category;

        }
        //finding product 
        const product = await schema.find(filter)

        //checking the category is existing
        if (product.length == [0]) {
            return res.status(404).json({ message: "There has been no category found" })
        }
        return res.status(200).json({ message: 'The result of the category', product })

        //error command
    } catch (error) {
        return res.status(400).json({ message: 'invalid command' })
    }

}


module.exports = allcategory