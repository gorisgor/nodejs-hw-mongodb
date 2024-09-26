import multer from "multer";
import createHttpError from "http-errors";
import { TEMP_UPLOAD_DIR } from "../constants/index.js";
import { allowedPhotoExtensions } from "../constants/contacts.js";

const storage = multer.diskStorage({
    destination: TEMP_UPLOAD_DIR,
    filename: (req, file, callback)=> {
        const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePreffix}_${file.originalname}`;
        callback(null, filename);
    }
});

const limits = {
    fileSize: 1024 * 1024 * 50,
};

const fileFilter = (req, file, callback) => {
    const extension = file.originalname.split(".").pop();        
    if (!allowedPhotoExtensions.includes(extension)) {
      return callback(createHttpError(400, `${extension} is not a valid extension, only ${allowedPhotoExtensions} allowed!`));
    }
    
    callback(null, true);
  };

const upload = multer({
    storage,
    limits,
    fileFilter,
});

export default upload;