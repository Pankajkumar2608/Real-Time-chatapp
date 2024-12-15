import { config } from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

import router from './routes/auth.route.js';
import connectDB from './lib/db.js';
config();

const app = express();
app.use(express.json());
app.use("/api/auth", router);
app.use(cookieParser());


const PORT = process.env.PORT;

app.get('/HI', (req, res) => {
    res.send('Hello, World!');

})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port', ${PORT}`);
    });
    
});



