import express from 'express';
import { signUp, login, loginFacebook, forgotPassword } from '../controllers/authControllers.js';

const authRoutes = express.Router();

// define API register (sign-up)
authRoutes.post("/sign-up", signUp);

// define API login
authRoutes.post("/login", login);


// define aPI login facebook
authRoutes.post("/login-facebook", loginFacebook);

// b1: define aPI forgot password
authRoutes.post("/forgot-password", forgotPassword);
export default authRoutes;