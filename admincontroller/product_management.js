const productschema = require('../model/productschema')



const addproduct = async (req,res) => {
    try {

        //get all data from body
        const {
            product_name,
            description,
            price,
            category,
             stock,
             image
            } = req.body
            
            //
            const productmodel = await productschema({
                product_name,
                description,
                price,
                category,
                stock,
                image
            });

            if (req.file) {
                productmodel.image = req.file.path
                
            }

            if(req.files) {
                let file = [];
                req.files.forEach((filename) => {
                file.push(filename.path);                    
                });
                productmodel.image = file;
            
                
            }
            

            await productmodel.save()
            console.log('product added successfully');
            
            return res.status(201).send({message:`product added successfully ${productmodel}`})
    } catch (error) {
        console.log(error);
        
        
    }
    
}


const updateproduct = async (req,res) => {
    try {
        const productid = req.params.id;
        const update = req.body;

        if (!productid) {
            return res.status(404).json({message: "product id is required"})
        }

        const updateproduct = await productschema.findByIdAndUpdate(productid,update);
        if (!updateproduct) {
            return res.status(400).json({message: "cannot update the product"});
        }
        res.status(200).json({message: "updated successfully"});


        
         } catch (error) {
       res.status(400).json({message: "invalid product"})
        
    }
    
}


const deleteproduct = async (req,res) => {
    
    try {
        const productid = req.params.id;

        if (!productid) {
            return res.status(404).json({message: "product id is required"})
        }
        
        const deleteproduct = await productschema.findByIdAndDelete(productid)
        if (!deleteproduct) {
            return res.status(400).json({message: 'product cannot been deleted'});
        }
        return res.status(200).json({message: 'product deleted successfully'});

        
    } catch (error) {
        return res.status(404).json({message: 'invalid command'})
        
    }
    
}

const viewproduct = async (req,res) => {
    try {
        const products = await productschema.find({})
        if (!products) {
            return res.status(404).json({message: 'product not found'});
        }
        return res.status(200).json({message: 'All the products are here',products});
        
    } catch (error) {
        return res.status(400).json({message: 'invalid command'})
        
    }
    
}


const viewproductid = async (req,res) => {
    try {
        const productid = req.params.id;
        const products = await productschema.findById(productid)
        if (!products) {
            return res.status(404).json({message: 'product not found'});
        }
        return res.status(200).json({message: 'The products',products});
        
    } catch (error) {
        return res.status(400).json({message: 'invalid command'})
        
    }
    
}

module.exports={addproduct,updateproduct,deleteproduct,viewproduct,viewproductid}