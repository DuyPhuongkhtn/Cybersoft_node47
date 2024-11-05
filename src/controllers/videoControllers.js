import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from 'sequelize'; // Operator
import { PrismaClient } from '@prisma/client';

// tạo object model đại diện cho tất cả model của orm
const model = initModels(sequelize);
const prisma = new PrismaClient();

const getVideos = async (req, res) => {
    try {
        let page = 3;
        let size = 4;
        let index = (page - 1) * size;
        // let data = await model.video.findAll({
        //     offset: index, // prisma: skip
        //     limit: size // prisma: take
        // });
        let data = await prisma.video.findMany({
            skip: index,
            take: size
        });

        // VD: page = 2, limit: 4
        // bỏ qua 4 item đầu tiên và lấy 4 item tiếp theo
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({message: "error for api get list videos"});
    }

}

const getTypes = async (req, res) => {
    // let data = await model.video_type.findAll();
    let data = await prisma.video_type.findMany({
        where: {
            type_id: 1
        },
        select: {
            type_name: true
        }
    });
    return res.status(200).json(data);
}

const getVideosTypeId = async (req, res) => {
    try {
        let { typeId } = req.params;
        let data = await model.video.findAll({
            where: {
                type_id: typeId
            }
        })
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: "error for api get list video by type id" });
    }
}

const getVideoById = async (req, res) => {
    try {
        let { videoId } = req.params;
        let data = await prisma.video.findFirst({
            where: {
                video_id: Number(videoId)
            },
            include: {
                users: {
                    select: {
                        user_id: true,
                        full_name: true,
                        email: true
                    }
                }
            }
        })
        // let data = await model.video.findOne({
        //     where: {
        //         video_id: videoId
        //     },
        //     include: [
        //         {
        //             model: model.users,
        //             as: "user"
        //         }
        //     ]
        // });
        return res.status(200).json(data);
    } catch (error) {
        console.log(er)
        return res.status(500).json({ message: "error for api get video by id" });
    }
}

export {
    getVideos,
    getTypes,
    getVideosTypeId,
    getVideoById,
}