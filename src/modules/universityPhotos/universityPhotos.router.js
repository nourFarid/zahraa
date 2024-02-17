const express = require ('express')
const router = express.Router()
const {uploadPhoto,getPhotos} = require ("./controller/universityPhotos.js")
const auth = require('../../middleware/auth.js')
const uploadFile = require('../../middleware/upload.js')

router.post("/uploadPhoto",uploadFile.upload.single('avatar'),uploadPhoto)

router.get('/getPhotos', getPhotos);

module.exports = router