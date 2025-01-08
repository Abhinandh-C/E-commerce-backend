const schema = require('../model/productschema')



const getproduct = async (req,res) => {
      try {
            const products = await schema.find({})
            if (!products) {
                return res.status(404).json({message: 'product not found'});
            }
            return res.status(200).json({message: 'All the products are here',products});
            
        } catch (error) {
            return res.status(400).json({message: 'invalid command'})
            
        }
}


const singleproduct = async (req,res) => {
     try {
            const productid = req.params.id;
            const products = await schema.findById(productid)
            if (!products) {
                return res.status(404).json({message: 'product not found'});
            }
            return res.status(200).json({message: 'The products',products});
            
        } catch (error) {
            return res.status(400).json({message: 'invalid command'})
            
        }
        
}

module.exports= {getproduct,singleproduct}