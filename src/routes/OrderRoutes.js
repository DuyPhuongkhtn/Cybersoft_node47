import express from 'express';
import { order } from '../controllers/order.controller.js';

const orderRoutes = express.Router();
orderRoutes.post("/order", order);

export default orderRoutes;