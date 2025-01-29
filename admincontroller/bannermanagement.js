const bannerschema = require('../model/banner')

const createbanner = async (req, res) => {

    try {
        const { title,
            description,

        } = req.body


        // check the feild
        if (!title || !description) {
            return res.status(400).json({
                message: 'require all the feilds'
            })

        }

        //checking the coupon exiting 
        const existingtitle = await bannerschema.findOne({ title })
        if (existingtitle) {
            return res.status(400).json({
                message: 'title with this name already exists.',
            });
        }

        //creating model
        const model = await bannerschema({
            title,
            description,
        });

        //multer function applying
        if (req.file) {
            model.image = req.file.path
        }

        if (req.files) {
            let file = [];
            req.files.forEach((filename) => {
                file.push(filename.path);
            });
            model.image = file;
        }

        //saving the model
        await model.save()
        return res.status(200).json({
            message: 'bannner has been created'
        })

        //error message
    } catch (error) {
        return res.status(400).json({
            message: 'error in create banner',
            error: error.message
        })

    }
}



const updatebanner = async (req, res) => {
    try {
        //taking from params
        const bannerid = req.params.id;

        //getting from the body
        const { title,
            description,
        } = req.body

        //checking the bannerID
        if (!bannerid) {
            return res.status(404).json({ message: "banner id is required" })
        }

        // check the feild
        if (!title || !description) {
            return res.status(400).json({
                message: 'require all the feilds'
            })

        }

        //find from schema and updateing
        const updatebanner = await bannerschema.findByIdAndUpdate(bannerid, { title, description }, { new: true });

        //checking the function
        if (!updatebanner) {
            return res.status(400).json({ message: "cannot update the banner" });
        }
        res.status(200).json({ message: "updated successfully" });


        //error message
    } catch (error) {
        res.status(400).json({ message: "invalid command", error: error.message })

    }

}




const deletebanner = async (req, res) => {

    try {
        //taking from params
        const bannerid = req.params.id;

        //checking the bannerID
        if (!bannerid) {
            return res.status(404).json({ message: "banner id is required" })
        }

        //find from schema and delete
        const deletebanner = await bannerschema.findByIdAndDelete(bannerid)

        //checking the function
        if (!deletebanner) {
            return res.status(400).json({ message: 'banner cannot been deleted' });
        }
        return res.status(200).json({ message: 'banner deleted successfully' });

        //error message
    } catch (error) {
        return res.status(404).json({ message: 'invalid command' })

    }

}

module.exports = { createbanner, updatebanner, deletebanner }