const express = require ('express')
const router = express.Router()
const{createLogs,getLogs,increment,getAllActions}= require("./controller/logs")

router.post("/createLogs",createLogs)
router.get("/getLogs",getLogs)
router.get("/getAllActions/:id",getAllActions)
router.put("/increment/:id",increment)




module.exports =router