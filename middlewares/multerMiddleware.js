import multer from "multer";
import path from "path";
import DataURIASync from "datauri/parser.js";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads");
//   }, // set the destination where uploaded file will be stored/saved

//   filename: (req, file, cb) => {
//     const fileName = file.originalname;
//     cb(null, fileName);
//   }, // defines the name of the uploaded file
// }); // specifying the configuration for storing uploaded files

const storage = multer.memoryStorage();

const upload = multer({ storage });

const parser = new DataURIASync();
export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};

export default upload;
