const express = require ('express')
const router = express.Router()
const instructionsController = require ("./controller/instructions.js")
const auth = require('../../middleware/auth.js')
const uploadFile = require('../../middleware/upload.js')

router.post('/',
  //  auth.auth([auth.roles.admin]),
     instructionsController.addInstructions)

router.get('/'
    , instructionsController.getInstructions)


router.put('/:instructionsId', 
//  auth.auth([auth.roles.admin]),
   instructionsController.updateInstructions)

router.delete('/:instructionsId', 
//auth.auth([auth.roles.admin]),
   instructionsController.deleteInstruction)

router.post("/upload" ,
  uploadFile.upload.single('avatar'),instructionsController.uploadFile)

  
router.get('/download/:id', instructionsController.downloadFile);

module.exports = router