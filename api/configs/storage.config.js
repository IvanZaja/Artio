const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v4: uuidv4 } = require('uuid');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'artio/uploads',
        public_id: (req, file) => {
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}-${month}-${year}-${req.user.name}`;
        }
    }

})

module.exports.uploadPDF = (file) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const uniqueId = uuidv4();

    return new Promise((resolve, reject) => 
        cloudinary.uploader.upload(
            file, 
            {
                folder: 'artio/uploads',
                public_id:`${day}-${month}-${year}-${uniqueId}`
            },
            (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            }
        )
    )
}

module.exports.storage = multer({ storage });
