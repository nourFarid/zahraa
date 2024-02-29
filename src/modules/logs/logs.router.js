const express = require ('express')
const router = express.Router()
const{createLogs,getLogs}= require("./controller/logs")

router.post("/createLogs",createLogs)
router.get("/getLogs",getLogs)




module.exports =router