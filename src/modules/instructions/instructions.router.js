const express = require ('express')
const router = express.Router()
const instructionsController = require ("./controller/instructions.js")
const auth = require('../../middleware/auth.js')

router.post('/',
    auth.auth([auth.roles.admin])
    , instructionsController.addInstructions)

router.get('/'
    , instructionsController.getInstructions)


router.put('/:instructionsId', auth.auth([auth.roles.admin])
    , instructionsController.updateInstructions)

router.delete('/:instructionsId', auth.auth([auth.roles.admin])
    , instructionsController.deleteInstruction)


module.exports = router