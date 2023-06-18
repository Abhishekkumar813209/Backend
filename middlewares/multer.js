// import multer from "multer";

// const storage = multer.memoryStorage();

// const singleUpload = multer({storage:storage}).single("file")

// export default singleUpload 
import multer from "multer";

const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype ===".mp4") {
//     // Accept JPEG files
//     cb(null, true);
//   } else {
//     // Reject other file types
//     cb(new Error("Unsupported file type: " + file.originalname));
//   }
// };

const singleUpload = multer({ storage: storage}).single("file");

export default singleUpload;
