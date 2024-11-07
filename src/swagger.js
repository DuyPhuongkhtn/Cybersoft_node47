
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


/**
* @swagger
* /video/get-videos:
*   get:
*       description: responses
*       tags: [User]
*       parameters:
*       - in: path
*         name: id
*       - in: body
*         name: user
*         schema:
*             type: object
*             properties:
*                   video_name:
*                       type: string
*                   thumbnail:
*                       type: string
*                   duration:
*                       type: number
*       responses:
*             200:
*                description: res
*/