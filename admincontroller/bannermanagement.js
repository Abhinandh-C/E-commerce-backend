 const bannerschema = require('../model/banner')

 const createbanner = async (req,res) => {

    try {
        const {title,
            description,
            
        } = req.body


         // check the feild
         if (!title || !description ) {
            return res.status(400).json({
            message: 'require all the feilds'
          })
                    
        }
        
        //checking the coupon exiting 
          const existingtitle = await bannerschema.findOne({title})
         if (existingtitle) {
            return res.status(400).json({
            message: 'title with this name already exists.',
             });
         }
        
         const model = await bannerschema({
            title,
            description,
        
         });

         if (req.file) {
            model.image = req.file.path
            
        }

        if(req.files) {
            let file = [];
            req.files.forEach((filename) => {
            file.push(filename.path);                    
            });
            model.image = file;
        
            
        }
        
        
        await model.save()
            return res.status(200).json({message:'bannner has been created'})
        
         } catch (error) {
         //error message
         return res.status(400).json({message: 'error in create banner',error:error.message
             })
         } 
        }
        
        const updatebanner = async (req,res) => {
            try {
                const bannerid = req.params.id;
                const {title,
                    description,
                    
                } = req.body
        
        
                if (!bannerid) {
                    return res.status(404).json({message: "banner id is required"})
                }

                   // check the feild
         if (!title || !description ) {
            return res.status(400).json({
            message: 'require all the feilds'
          })
                    
        }
        
                const updatebanner = await bannerschema.findByIdAndUpdate(bannerid,{title,description},{new:true});
                if (!updatebanner) {
                    return res.status(400).json({message: "cannot update the banner"});
                }
                res.status(200).json({message: "updated successfully"});
        
        
                
                 } catch (error) {
               res.status(400).json({message: "invalid command",error:error.message})
                
            }
            
        }
        const deletebanner = async (req,res) => {
            
            try {
                const bannerid = req.params.id;
        
                if (!bannerid) {
                    return res.status(404).json({message: "banner id is required"})
                }
                
                const deletebanner = await bannerschema.findByIdAndDelete(bannerid)
                if (!deletebanner) {
                    return res.status(400).json({message: 'banner cannot been deleted'});
                }
                return res.status(200).json({message: 'banner deleted successfully'});
        
                
            } catch (error) {
                return res.status(404).json({message: 'invalid command'})
                
            }
            
        }

        module.exports = {createbanner,updatebanner,deletebanner}