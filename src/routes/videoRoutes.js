import express from 'express';
import { getVideos, getTypes, getVideosTypeId, getVideoById } from '../controllers/videoControllers.js';
import { middlewareToken } from '../config/jwt.js';
import { tryCatch } from '../config/tryCatch.js';

const videoRoutes = express.Router();

// define API get list videos

/**
* @swagger
* /video/get-video:
*  post:
*       description: responses
*       tags: [Video]
*       responses:
*           200:
*               description: success
*/
videoRoutes.get("/get-videos",getVideos);


// define api get type video
videoRoutes.get("/get-types", tryCatch(getTypes)); // apply authentication

// define api get list video by video type (type_id)
videoRoutes.get("/get-videos/:typeId", getVideosTypeId);

// define api get video detail

/**
* @swagger
* /video/get-video/{id}:
*   get:
*       description: responses
*       tags: [User]
*       parameters:
*       - in: path
*         name: id
*       responses:
*             200:
*                description: res
*/
videoRoutes.get("/get-video/:videoId", getVideoById);

export default videoRoutes;