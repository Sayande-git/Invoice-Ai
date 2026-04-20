import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {ClerkMiddlewere} from '@clerk/express'
import { connect } from 'mongoose';
import { connectDB } from './config/db';

const app = express();
const port = 4000;

//MiddleWares
app.use(cors());
app.use(ClerkMiddlewere());
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({limit: '20mb', extended: true, parameterLimit: 20000}));

//DB
connectDB
//Routes
app.get('/', (req, res) => {
    res.send('API working!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});