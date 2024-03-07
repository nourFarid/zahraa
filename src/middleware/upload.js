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
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['pdf', 'png', 'jpg', 'jpeg', 'xlsx'];
    const fileType = file.mimetype.split("/")[1];

    if (allowedTypes.includes(fileType) || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, PNG, JPG, JPEG, and XLSX files are allowed.'), false);
    }
}



const upload = multer({ storage: diskStorage, 
    fileFilter 
})

module.exports = {
    upload,
    fileFilter,
    diskStorage
}