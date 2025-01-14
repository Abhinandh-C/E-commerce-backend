const orderschema = require('../model/orderschema');
const productschema = require('../model/productschema');

const recentorder = async (req,res) => {
    try {
         //finding the recent orders
        const order = await orderschema.find()
        .sort({orderdate: -1})
        .limit(5)
    

        //checking the orders
        if (!recentorder || recentorder.length === 0) {
            return res.status(404).json({
                message: "No recent orders found",
            });
        }
        //success
        res.status(200).json({
            message: "Recent orders ",
            order
        });
        
        //success
        } catch (error) {
        return res.status(400).json({message:"invalid command",error:error.message})
        }
    
}

const topSellingProducts = async (req, res) => {
    try {
        // Aggregating data from the orders collection
        const topSellingProducts = await orderschema.aggregate([
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: "$products.productid",
                    totalQuantity: { $sum: "$products.quantity" }, 
                },
            },
            {
                $sort: { totalQuantity: -1 },
            },
            {
                $limit: 5, 
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id", 
                    foreignField: "_id", 
                    as: "productDetails", 
                },
            },
        ]);

        // Check if no top-selling products are found
        if (!topSellingProducts || topSellingProducts.length === 0) {
            return res.status(404).json({
                message: "No top-selling products found",
            });
        }

        // Successfull
        res.status(200).json({
            message: "Top-selling products fetched successfully",
             topSellingProducts,
        });

       //error message 
    } catch (error){
        return res.status(400).json({
            message: "invalid command",error:error.message

    })
}
}


const inventoryStatus = async (req, res) => {
    try {
        
        const Status = await productschema.find({}, {
            _id: 1, 
            product_name: 1, 
            stock: 1, 
            price: 1 
        });

        //checking the data is available or not
        if (!inventoryStatus || inventoryStatus.length === 0) {
            return res.status(404).json({
                message: "No inventory data found",
            });
        }

        //successfull
        res.status(200).json({
            message: "Inventory status fetched successfully",
            Status,
        });

        //error message
        } catch (error) {
        res.status(500).json({
            message: "Error fetching inventory status",
            error: error.message,
        });
    }
};



module.exports = {recentorder,topSellingProducts,inventoryStatus}