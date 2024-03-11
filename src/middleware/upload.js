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
    const allowedTypes = [
        'application/pdf',
        'image/png',
        'image/jpeg',
        'image/jpg',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.rar',
        'application/x-rar-compressed',
        'application/zip' 

    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, PNG, JPG, JPEG, XLSX, and RAR files are allowed.'), false);
    }
};


const upload = multer({ storage: diskStorage, 
    fileFilter 
})

module.exports = {
    upload,
    fileFilter,
    diskStorage
}