import express from 'express';
import { createUser, getUserDb, getUsers, getUserOrm, getUserOrmById, createUserOrm, updateUser, deleteUser } from '../controllers/userControllers.js';
import { middlewareToken } from '../config/jwt.js';
import {tryCatch} from '../config/tryCatch.js';

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

export default userRoutes;