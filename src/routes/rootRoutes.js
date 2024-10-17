import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import videoRoutes from './videoRoutes.js';

// define object rootRoutes
const rootRoutes = express.Router();

// import userRoutes vào rootRoutes
rootRoutes.use("/user", userRoutes);


// import videoRoutes vào rootRoutes
rootRoutes.use("/video", videoRoutes);

// import authRoutes vào rootRoutes
rootRoutes.use("/auth", authRoutes);

export default rootRoutes;