import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
cloudinary.config({ 
            cloud_name: process.env.CLOWDINARY_CLOUD_NAME,
            api_key:process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOWDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
        })
const uploadFile = async (filePath) => {
    try{
        if(!filePath) {
            throw new Error('File path is required');
        }
        const result = await cloudinary.uploader.upload(filepath,{
            resource_type: 'auto' // Automatically detect the resource type (image, video, etc.)
        })
        console.log('File uploaded successfully:', result.url);
        return result.url;

    }
    catch (error) {
    fs.unlinkSync(filePath); 
    return null;// Delete the fil e if upload fails
    }
}
export { uploadFile };
