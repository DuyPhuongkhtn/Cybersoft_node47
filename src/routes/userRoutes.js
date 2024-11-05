import express from 'express';
import { createUser, getUserDb, getUsers, getUserOrm, getUserOrmById, createUserOrm, updateUser, deleteUser } from '../controllers/userControllers.js';
import { middlewareToken } from '../config/jwt.js';
import {tryCatch} from '../config/tryCatch.js';
import { upload } from '../config/upload.js';
import { uploadCloud } from '../config/upload.cloud.js';

const userRoutes = express.Router();

// define API get list users
userRoutes.get("/get-users", getUsers);
userRoutes.post("/create-user", createUser);
userRoutes.get("/get-user-db", getUserDb);
userRoutes.get("/get-users-orm", middlewareToken, getUserOrm);
userRoutes.get("/get-users-orm/:id",middlewareToken, getUserOrmById);
userRoutes.post("/create-user-orm", createUserOrm);
userRoutes.put("/update-user", tryCatch(updateUser));
userRoutes.delete("/delete-user/:user_id", deleteUser);
userRoutes.post("/upload-avatar", upload.single("hinhAnh"), (req, res) => {
    let file = req.file;
    return res.status(200).json(file);
});
userRoutes.post("/upload-multiple-avatar", upload.array("hinhAnhs"), (req, res) => {
    let files = req.files;
    return res.status(200).json(files);
});
userRoutes.post("/upload-cloud-avatar", uploadCloud.single("hinhAnh"), async (req, res) => {
    let file = req.file;
    return res.status(200).json(file);
});
userRoutes.post("/upload-multiple-cloud", uploadCloud.array("hinhAnhs"), (req, res) => {
    let files = req.files;
    return res.status(200).json(files);
});

export default userRoutes;