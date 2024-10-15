import express from 'express';
import { signUp, login } from '../controllers/authControllers.js';

const authRoutes = express.Router();

// define API register (sign-up)
authRoutes.post("/sign-up", signUp);

// define API login
authRoutes.post("/login", login);
export default authRoutes;