import express from "express";
import userController from "../controllers/user.js";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/upload/`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/users", upload.single("profile"), userController.createUser);
router.get("/users", userController.getAllUser);

export default router;
