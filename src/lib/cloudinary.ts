import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload an image to Cloudinary
 * @param file - The file to upload (as base64 string or buffer)
 * @param folder - Folder path in Cloudinary (e.g., 'mister-lya/products')
 * @returns Object containing the secure URL and public ID
 */
export async function uploadImage(
  file: string | Buffer,
  folder: string = 'mister-lya/products'
): Promise<{ url: string; publicId: string }> {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: 'image',
      // Auto-optimize images
      transformation: [
        {
          quality: 'auto',
          fetch_format: 'auto',
        },
      ],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

/**
 * Delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 * @returns Success status
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
}

/**
 * Validate that Cloudinary is properly configured
 */
export function validateCloudinaryConfig(): boolean {
  const { cloud_name, api_key, api_secret } = cloudinary.config();
  return !!(cloud_name && api_key && api_secret);
}
