const schema = require('../model/productschema')


const allcategory = async (req,res) => {
    try {
       const {category} = req.query;
       const filter = {};


        if (category) {
            filter.category = category;
            
        }

        const product = await schema.find(filter)

        if (product.length== [0] ) {
            return res.status(404).json({message: "There has been no category found"})
        }

        return res.status(200).json({message: 'The result of the category',product})
       

        
    } catch (error) {
        return res.status(400).json({message: 'invalid command'})
    }
    
}


module.exports = allcategory