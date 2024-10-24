import express from 'express';
import { signUp, login, loginFacebook, forgotPassword, changePassword, extendToken } from '../controllers/authControllers.js';

const authRoutes = express.Router();

// define API register (sign-up)
authRoutes.post("/sign-up", signUp);

// define API login
authRoutes.post("/login", login);


// define aPI login facebook
authRoutes.post("/login-facebook", loginFacebook);

// b1: define aPI forgot password
authRoutes.post("/forgot-password", forgotPassword);

// b2: define API change password
authRoutes.post("/change-password", changePassword);

// define API extend-token
authRoutes.post("/extend-token", extendToken);
export default authRoutes;