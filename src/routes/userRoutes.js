import express from 'express';
import { createUser, getUserDb, getUsers, getUserOrm, getUserOrmById, createUserOrm } from '../controllers/userControllers.js';

const userRoutes = express.Router();

// define API get list users
userRoutes.get("/get-users", getUsers);
userRoutes.post("/create-user", createUser);
userRoutes.get("/get-user-db", getUserDb);
userRoutes.get("/get-users-orm", getUserOrm);
userRoutes.get("/get-users-orm/:id", getUserOrmById);
userRoutes.post("/create-user-orm", createUserOrm);

export default userRoutes;