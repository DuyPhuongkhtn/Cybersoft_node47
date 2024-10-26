import express from 'express';
import { rateResByRes, rateResByUser, rateRes } from '../controllers/rateRes.controller.js';

const rateResRoutes = express.Router();
rateResRoutes.get("/rate-res-by-res/:res_id", rateResByRes);
rateResRoutes.get("/rate-res-by-user/:user_id", rateResByUser);
rateResRoutes.post("/rate-res", rateRes);

export default rateResRoutes;