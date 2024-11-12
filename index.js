import express from 'express';
import connect from './db.js';
import rootRoutes from './src/routes/rootRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// tạo object tổng của express
const app = express();

// thêm middleware cors để nhận request từ FE hoặc bên khác
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// thêm middleware để get info cookie từ request FE hoặc postman
app.use(cookieParser());

// thêm middlware để convert string về json với API POST và PUT
app.use(express.json());

// import rootRoutes vào index.js
app.use(rootRoutes);

// define middleware để handle lỗi
// define cho express hiểu khi có error xảy ra
// thì express nó sẽ tìm tới middleware này
//  lưu ý: phải truyền 4 params để express hiểu
// đó là middleware handle lỗi
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal server"
    })
});

// viết API hello world
app.get("/hello-world", (req, res) => {
    res.send("hello world");

});

app.get("/health-check", (req, res) => {
    res.send("Server is normally")
});

// lấy thông tin data từ params, query string, headers, body
// http://localhost:8080/get-user/1
// define API get-user
app.get("/get-user/:id/:hoTen", (req, res) => {
    // lấy id từ URL
    let { id, hoTen } = req.params;
    let { queryString } = req.query;
    let { token, authorization } = req.headers;
    let headers = req.headers
    res.send({ id, hoTen, queryString, token, authorization });
});

// lấy body từ API POST (create) và PUT (update)

'{ "id": 1, "hoTen": "Phuong" }'
// app.post("/create-user", (req, res) => {
//     let body = req.body;
//     res.send(body);
// })

// app.get("/get-user-db", async (req, res) => {
//     const [data] = await connect.query(`
//         SELECT * from users
//     `)
//     res.send(data);
// })

// app.post("/create-user-db", async (req, res) => {
//     const query = `
//         INSERT INTO users(full_name, email, pass_word) VALUES
//         (?, ?, ?)
//     `;
//     let body = req.body;
//     let {full_name, email, pass_word} = body;
//     const [data] = await connect.execute(query, [full_name, email, pass_word])
//     return res.send(data);
// })

// define port cho BE
app.listen(8080, () => {
    console.log("BE starting with port 8080");
});

//npx sequelize-auto -h localhost -d node47_youtube -u root -x 123456 -p 3307 --dialect mysql -o src/models -l esm

// B1: npx prisma init
// B1.1: sửa lại info connection string
// B2: npx prisma db pull (db first)
// b3: npx prisma generate (khởi tạo client) <==> connect trong sequelize




// yarn add swagger-ui-express swagger-jsdoc
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc';

const option = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger nodejs 47',
            version: '1.0.1',
            description: 'mô tả swagger'
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'mô tả thông tin server'
            }
        ]
    },
    apis: ["src/routes/*.js"]
}
const specs = swaggerJSDoc(option)
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs))






import { createServer } from "http"; // server có sẵn khi cài nodejs
import { Server } from "socket.io";
import { PrismaClient } from '@prisma/client';

const httpServer = createServer(app);

// đối tượng socket server
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});
let number = 0

const prisma = new PrismaClient()

io.on("connection", (socket) => {

    // chat app


    socket.on("client-chat", async (data) => {
        // lưu database
        let model = {
            user_id: Number(data.user_id),
            content: data.content,
            room_id: data.roomId,
            date: new Date()
        }

        await prisma.chat.create({ data: model })


        io.to(data.roomId).emit("send-chat", data)

    })

    socket.on("join-room", async (roomId) => {
        socket.rooms.forEach(roomId => socket.leave(roomId))

        socket.join(roomId) // rooms => join theo list room

        let dataChat = await prisma.chat.findMany({
            where: {
                room_id: roomId
            }
        })

        io.to(roomId).emit("send-db-chat", dataChat)


    })






    // đối tượng socket client
    // console.log(socket.id)

    // io.emit("send-data", socket.id) // gửi data đến tất cả client đang kết nối

    // // dùng on thì gọi socket
    // // dùng emit thì gọi io
    // socket.on("client-send", () => {
    //     io.emit("send-number", number++)

    // })

    // socket.on("client-chat", (mess) => {
    //     // lưu database

    //     io.to("room-3").emit("send-chat", mess)

    // })

    // socket.on("join-room", () => {
    //     socket.join("room-1")
    //     socket.join("room-2")
    //     socket.join("room-3")

    //     console.log(socket.id + " đã vào room-1")

    // })
});

httpServer.listen(8081);