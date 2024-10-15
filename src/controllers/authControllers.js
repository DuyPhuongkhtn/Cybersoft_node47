import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import {Op} from 'sequelize'; // Operator
import bcrypt from 'bcrypt'; // lib mã hóa password
import transporter from "../config/transporter.js";
import jwt from 'jsonwebtoken'; // lib tạo token

// tạo object model đại diện cho tất cả model của orm
const model = initModels(sequelize);


const signUp = async (req, res) => {
    try {
        // lấy input từ body req (email, full_name, pass_word)
        let {full_name, email, pass_word} = req.body;

        // kiểm tra email có tồn tại trong db hay không
        let checkUser = await model.users.findOne({
            where: {
                email
            }
        })
        // code theo hướng fail first: bắt những case lỗi trước
        // nếu user tồn tại trong db => return error
        if (checkUser) {
            return res.status(400).json({message: "Email is wrong"});
        }
        // create new user
        // create => create
        // update => update
        // remove => destroy
        await model.users.create({
            full_name,
            email,
            pass_word: bcrypt.hashSync(pass_word, 10)
        })

        // send email
        // B1: cấu hình email
        const mailOption = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to Our Service",
            html: `
                <h1>Welcome ${full_name} to Our service</h1>
            `
        }

        // B2: gửi email
        transporter.sendMail(mailOption, (err, info) => {
            if (err) {
                return res.status(500).json({message: "Send email fail"});
            }
            return res.status(201).json({message: "Create user successfully"})
        })
    } catch (error) {
        return res.status(500).json({message: "error API sign-up"})
    }
};

const login = async (req, res) => {
    try {
        // lấy email và pass_word từ body req
        let {email, pass_word} = req.body;

        // kiểm tra email có tồn tại trong db hay ko
        // nếu ko có email => return error
        let checkUser = await model.users.findOne(({
            where: {email}
        }));
        if (!checkUser) {
            return res.status(400).json({message: "Email is wrong"});
        }

        // nếu tồn tại => check password
        // param 1: password chưa mã hóa
        // param 2: password đã mã hóa
        let checkPass = bcrypt.compareSync(pass_word, checkUser.pass_word);
        if (!checkPass) {
            return res.status(400).json({message: "Password is wrong"});
        }

        // dùng lib jsonwebtoken để tạo token

        // tạo payload để lưu vào access token
        let payload = {
            userId: checkUser.user_id
        }

        // tạo access token bằng khóa đối xứng
        let accessToken = jwt.sign({payload: payload}, "NODE47", {
            algorithm: "HS256",
            expiresIn: "30m" // m: minute, s: second, h: hour, d: day
        });

        return res.status(200).json({message: "Login successfully", token: accessToken});
        // access token + refresh token
    } catch (error) {
        return res.status(500).json({message: "error API login"});
    }
}

export {
    signUp,
    login
}