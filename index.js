import express from 'express';
import rootRoutes from './src/routes/rootRoutes.js';

const app = express();

app.use(rootRoutes);

app.listen(8080, () => {
    console.log("Starting with port 8080");
})