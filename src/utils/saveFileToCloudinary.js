import { v2 as cloudinary } from 'cloudinary';
import * as fs from "node:fs/promises";
import {env} from "./env.js";

cloudinary.config({
    cloudName: env("CLOUDINARY_CLOUD_NAME"),
    apiKey: env("CLOUDINARY_API_KEY"),
    apiSecret: env("CLOUDINARY_API_SECRET"),
});

const saveFileToCloudinary = async (file, folder) => {
    const response = await cloudinary.uploader.upload(file.path, {
        folder,
    });
    await fs.unlink(file.path);

    return response.secure_url;
};

export default saveFileToCloudinary;