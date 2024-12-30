const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
      destination: function (req,file,cb) {
        cb(null,'upload/')
      },
      filename: function(req,file,cb) {
        // let ext = path.extname(file.originalname)
        // cb(null,Date.now() + ext)
        cb(null,file.originalname)
      }
})

const upload = multer({storage})

module.exports = upload