import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize);

const likeResByResId = async (req, res) => {
    try {
        let {res_id} = req.params;
        let likeRes = await model.rate_res.findAll({
            where: {
                res_id
            }
        })
        return res.status(200).json(likeRes);
    } catch (error) {
        return res.status(500).json({message: "Internal server"});
    }
}

const likeResByUserId = (req, res) => {
    return res.status(200).json({message: "likeResByUserId"})
}

const likeRes = (req, res) => {
    return res.status(200).json({message: "likeRes"});
}

const dislikeRes = (req, res) => {
    return res.status(200).json({message: "dislikeRes"});
}

export {
    likeResByResId,
    likeResByUserId,
    likeRes,
    dislikeRes,
}