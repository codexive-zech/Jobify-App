import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  }, // set the destination where uploaded file will be stored/saved

  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  }, // defines the name of the uploaded file
}); // specifying the configuration for storing uploaded files

const upload = multer({ storage });

export default upload;
