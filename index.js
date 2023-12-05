const path = require ('path')
const url = require ('url')
const dotenv = require('dotenv')
//const multer = require('multer');
//set directory dirname 
//const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
const express = require ('express')
const initApp = require ('./src/index.router.js')
const app = express()
// setup port and the baseUrl
const port = process.env.PORT || 5000
initApp(app ,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))