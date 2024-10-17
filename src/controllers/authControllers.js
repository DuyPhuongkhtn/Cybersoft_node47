import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from 'sequelize'; // Operator
import bcrypt from 'bcrypt'; // lib mã hóa password
import transporter from "../config/transporter.js";
import jwt from 'jsonwebtoken'; // lib tạo token
import { createToken } from "../config/jwt.js";
import crypto from 'crypto'; // lib tạo code forgot password
import code from "../models/code.js";

// tạo object model đại diện cho tất cả model của orm
const model = initModels(sequelize);


const signUp = async (req, res) => {
    try {
        // lấy input từ body req (email, full_name, pass_word)
        let { full_name, email, pass_word } = req.body;

        // kiểm tra email có tồn tại trong db hay không
        let checkUser = await model.users.findOne({
            where: {
                email
            }
        })
        // code theo hướng fail first: bắt những case lỗi trước
        // nếu user tồn tại trong db => return error
        if (checkUser) {
            return res.status(400).json({ message: "Email is wrong" });
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
                return res.status(500).json({ message: "Send email fail" });
            }
            return res.status(201).json({ message: "Create user successfully" })
        })
    } catch (error) {
        return res.status(500).json({ message: "error API sign-up" })
    }
};

const login = async (req, res) => {
    try {
        // lấy email và pass_word từ body req
        let { email, pass_word } = req.body;

        // kiểm tra email có tồn tại trong db hay ko
        // nếu ko có email => return error
        let checkUser = await model.users.findOne(({
            where: { email }
        }));
        if (!checkUser) {
            return res.status(400).json({ message: "Email is wrong" });
        }

        // nếu tồn tại => check password
        // param 1: password chưa mã hóa
        // param 2: password đã mã hóa
        let checkPass = bcrypt.compareSync(pass_word, checkUser.pass_word);
        if (!checkPass) {
            return res.status(400).json({ message: "Password is wrong" });
        }

        // dùng lib jsonwebtoken để tạo token

        // tạo payload để lưu vào access token
        let payload = {
            userId: checkUser.user_id
        }

        // tạo access token bằng khóa đối xứng
        let accessToken = createToken(payload);

        return res.status(200).json({ message: "Login successfully", token: accessToken });
        // access token + refresh token
    } catch (error) {
        return res.status(500).json({ message: "error API login" });
    }
}

const loginFacebook = async (req, res) => {
    try {
        let { id, email, name } = req.body;
        // lấy info user từ db
        let checkUser = await model.users.findOne({
            where: {
                email
            }
        })

        // nếu email này không tồn tại trong db => tạo user mới, send mail và
        // return access token
        if (!checkUser) {
            let newUser = await model.users.create({
                full_name: name,
                email,
                face_app_id: id
            });
            // send email welcome
            // send email
            // B1: cấu hình email
            const mailOption = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Welcome to Our Service",
                html: `
                <h1>Welcome ${name} to Our service</h1>
            `
            }

            // B2: gửi email
            return transporter.sendMail(mailOption, (err, info) => {
                if (err) {
                    return res.status(500).json({ message: "Send email fail" });
                }
                // tạo access token
                // tạo payload để lưu vào access token
                let payload = {
                    userId: newUser.user_id
                }

                // tạo access token bằng khóa đối xứng
                let accessToken = createToken(payload);
                return res.status(201).json({ message: "Login successfully", token: accessToken })
            })
        }
        // nếu user tồn tại
        // tạo access token
        // tạo payload để lưu vào access token
        let payload = {
            userId: checkUser.user_id
        }

        // tạo access token bằng khóa đối xứng
        let accessToken = createToken(payload);
        return res.status(200).json({ message: "Login successfully", token: accessToken })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error API login facebook" });
    }
}

const forgotPassword = async (req, res) => {
    try {
        let { email } = req.body;

        // kiểm tra email có tồn tại trong db hay không
        let checkUser = await model.users.findOne({
            where: { email }
        });

        if (!checkUser) {
            return res.status(400).json({ message: "Email is wrong" });
        }

        // tạo code
        let randomCode = crypto.randomBytes(6).toString("hex");
        // tạo biến để lưu expire code
        let expired = new Date(new Date().getTime() + 2 * 60 * 60 * 1000) // expire 2h

        // lưu code vào db
        await model.code.create({
            code: randomCode,
            expired
        })

        // send email gửi code forgot password
        const mailOption = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Code xác thực",
            html: `
            <h1>${randomCode}</h1>
        `
        }

        // B2: gửi email
        return transporter.sendMail(mailOption, (err, info) => {
            if (err) {
                return res.status(500).json({ message: "Send email fail" });
            }
            return res.status(200).json({ message: "Send forgot password successfully" })
        })
    } catch (error) {
        return res.status(500).json({ message: "error API forgot password" });
    }
}

export {
    signUp,
    login,
    loginFacebook,
    forgotPassword
}