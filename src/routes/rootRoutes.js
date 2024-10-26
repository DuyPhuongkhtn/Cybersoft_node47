import express from 'express';
import likeResRoutes from './likeResroutes.js';
import rateResRoutes from './rateResRoutes.js';
import orderRoutes from './OrderRoutes.js';

const rootRoutes = express.Router();
rootRoutes.use(likeResRoutes);
rootRoutes.use(rateResRoutes);
rootRoutes.use(orderRoutes);

export default rootRoutes;