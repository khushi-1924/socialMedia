import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API, 
    api_secret: process.env.CLOUDINARY_CLOUD_NAME // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async(localFilePath) => {
    try {
        // if file not found
        if (!localFilePath) {
            return res.status(400).json({ success: false, message: 'file not found' });
        }
        // upload file
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })
        // file has been uploaded successfully
        console.log('file uploaded successfully', response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload opearation got failed
        return null;
    }
}

export { uploadOnCloudinary };