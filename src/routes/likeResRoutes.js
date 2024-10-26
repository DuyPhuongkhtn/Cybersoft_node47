import express from 'express';
import { likeResByResId, likeResByUserId, likeRes, dislikeRes } from '../controllers/likeRes.controller.js';

const likeResRoutes  = express.Router();

likeResRoutes.get("/like-res-by-res/:res_id", likeResByResId);
likeResRoutes.get("/like-res-by-user/:user_id", likeResByUserId);
likeResRoutes.post("/like", likeRes);
likeResRoutes.delete("/dislike/:res_id/:user_id", dislikeRes);

export default likeResRoutes;