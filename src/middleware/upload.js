const multer = require("multer");

const diskStorage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            // const fileName = file.originalname
            cb(null, file.originalname )
            // cb(null,'uploads'  )
        },

    }
)

// const fileFilter = (req, file, cb) => {
//     const type = file.mimetype.split("/")[1];
//     if ( type === 'pdf' || type === 'png' || type === 'jpg' || type === 'jpeg'|| type === 'xlsx' ) {
//         return cb(null, true)
//     }
    
//}

const upload = multer({ storage: diskStorage, 
    //fileFilter 
})

module.exports = {
    upload,
    //fileFilter,
    diskStorage
}