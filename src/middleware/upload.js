const multer = require("multer");

const diskStorage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            // const fileName = file.originalname
            cb(null, file.originalname )
        },

    }
)

const fileFilter = (req, file, cb) => {
    const jpgType = file.mimetype.split("/")[1];
    if ( jpgType === 'pdf') {
        return cb(null, true)
    }
    else
        return cb('file must be pdf ',false)
}

const upload = multer({ storage: diskStorage, fileFilter })

module.exports = {
    upload,
    fileFilter,
    diskStorage
}