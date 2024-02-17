const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const fs = require('fs');
const path = require('path');
const UniversityPhotos= require("../../../../DB/model/universityPhotos/universityPhotos.js")


const uploadPhoto= errorHandling.asyncHandler(async(req,res,next)=>{
    if (req.file) {
        const { originalname, path, mimetype } = req.file;
        const {whatFor}=req.body
        const buffer = fs.readFileSync(path);

        const photo = new UniversityPhotos({
            // avatar: originalname,
            whatFor: whatFor,
            name: originalname,
            data: buffer,
            contentType: mimetype
        });
        console.log('====================================');
        console.log(buffer);
        console.log('====================================');
  
        await photo.save();
        // fs.unlinkSync(path);
        return res.status(201).json({status: httpStatusText.SUCCESS, data: { photo } });
    } 
      return res.status(404).json({ status: httpStatusText.FAIL, message: 'No file provided' });
    


})


// const getPhotos = errorHandling.asyncHandler(async (req, res, next) => {
   
//     const directoryPath = path.join(__dirname, '../../../../uploads');

//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Internal server error' });
//     }

//     const photos = files.filter(file => file.endsWith('.png')); // Filter only JPEG files, adjust as needed

//     photos.forEach(photo => {
//       const filePath = path.join(directoryPath, photo);
//       const fileStream = fs.createReadStream(filePath);

//       fileStream.on('open', () => {
//         res.writeHeader(200, { 'Content-Type': 'image/png' });
//         fileStream.pipe(res);
//       });

//       fileStream.on('error', err => {
//         res.status(500).json({ error: 'Internal server error' });
//       });
//     });
//   });

//   });

// const getPhotos = errorHandling.asyncHandler(async (req, res, next) => {
//     try {
//       const directoryPath = path.join(__dirname, '../../../../uploads');
//       const files = await fs.promises.readdir(directoryPath);
  
//       res.writeHead(200, { 'Content-Type': 'image/png' });
  
//       for (const file of files) {
//         if (file.endsWith('.png')) {
//           const filePath = path.join(directoryPath, file);
//           const fileStream = fs.createReadStream(filePath);
//           fileStream.pipe(res);
//           await new Promise((resolve, reject) => {
//             fileStream.on('end', resolve);
//             fileStream.on('error', reject);
//           });
//         }
//       }
  
//       res.end();
//     } catch (err) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
// const getPhotos = errorHandling.asyncHandler(async (req, res, next) => {
//     try {
//       const directoryPath = path.join(__dirname, '../../../../uploads');
//       const files = await fs.promises.readdir(directoryPath);
  
//       // Set the initial response headers
//       res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  
//       for (const file of files) {
//         if (file.endsWith('.png')) {
//           const filePath = path.join(directoryPath, file);
//           const fileStream = fs.createReadStream(filePath);
  
//           // Send photo name
//           res.write(`Photo Name: ${file}\n\n`, 'utf-8');
  
//           // Send image data
//           fileStream.pipe(res);
  
//           // Wait for the file stream to end before moving to the next file
//           await new Promise((resolve, reject) => {
//             fileStream.on('end', resolve);
//             fileStream.on('error', reject);
//           });
  
//           // Add an extra newline between photos
//           res.write('\n\n');
//         }
//       }
  
//       res.end(); // End the response
//     } catch (err) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  
const getPhotos= async (req, res) => {
    

    try {
        // Find all photos in the database
        const photos = await UniversityPhotos.find();
    
        // If no photos are found, return an empty array
        if (!photos) {
          return res.status(200).json([]);
        }
    
        // Convert each photo's binary data to base64 and add it to the response
        const photosWithBase64 = photos.map(photo => {
          const base64Data = photo.data ? photo.data.toString('base64') : null;
          return {
           
            _id: photo._id,
            whatFor: photo.whatFor,
            name: photo.name,
            data: base64Data,
            contentType: photo.contentType,
          };
        });
    
        // Send the array of photos back as a response
        res.status(200).json(photosWithBase64);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve photos' });
      }
  
  };
  module.exports = {
    uploadPhoto,
    getPhotos,
  };
  


    