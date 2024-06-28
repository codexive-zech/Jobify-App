import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  }, // set the destination where uploaded file will be stored
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  }, // set the name of the uploaded file
});

const upload = multer({ storage });

export default upload;
