const path =require ('path')
const url =require ('url')
const dotenv =require ('dotenv')
//set directory dirname 
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../config/.env') })
import cloudinary from 'cloudinary';


cloudinary.v2.config({
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    cloud_name: process.env.cloud_name,
    secure: true
})

module.exports = cloudinary.v2;