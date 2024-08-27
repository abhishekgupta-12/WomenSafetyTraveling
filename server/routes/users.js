import express from "express";
import multer from "multer";
import path from "path";
import { signin, signup, updateUser } from "../controllers/user.js";
import auth from "../middleware/auth.js";

// Create a new router instance
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Directory where files will be stored
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    // Create a unique filename
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Define routes
router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/user/update', auth, upload.single('picture'), updateUser); // Ensure 'upload' is applied here and ID is in the URL

export default router;
