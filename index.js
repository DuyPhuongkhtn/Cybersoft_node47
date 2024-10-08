import express from 'express';
import connect from './db.js';
import rootRoutes from './src/routes/rootRoutes.js';

// tạo object tổng của express
const app = express();

// thêm middlware để convert string về json với API POST và PUT
app.use(express.json());

// import rootRoutes vào index.js
app.use(rootRoutes);

// viết API hello world
app.get("/hello-world", (req, res) => {
    res.send("hello world");

});

app.get("/health-check", (req, res)=>{
    res.send("Server is normally")
});

// lấy thông tin data từ params, query string, headers, body
// http://localhost:8080/get-user/1
// define API get-user
app.get("/get-user/:id/:hoTen", (req, res)=>{
    // lấy id từ URL
    let {id, hoTen} = req.params;
    let {queryString} = req.query;
    let {token, authorization} = req.headers;
    let headers = req.headers
    res.send({id, hoTen, queryString, token, authorization });
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

app.post("/create-user-db", async (req, res) => {
    const query = `
        INSERT INTO users(full_name, email, pass_word) VALUES
        (?, ?, ?)
    `;
    let body = req.body;
    let {full_name, email, pass_word} = body;
    const [data] = await connect.execute(query, [full_name, email, pass_word])
    return res.send(data);
})

// define port cho BE
app.listen(8080, () => {
    console.log("BE starting with port 8080");
});

//npx sequelize-auto -h localhost -d node47_youtube -u root -x 123456 -p 3307 --dialect mysql -o src/models -l esm