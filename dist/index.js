import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRoute from './routes/admin.js';
dotenv.config();
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());
app.use('/api/v1', adminRoute);
app.listen(process.env.PORT, () => {
    console.log(`app listing on port number ${process.env.PORT}`);
});
