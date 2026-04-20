import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {ClerkMiddlewere} from '@clerk/express'

const app = express();
const port = 4000;

//MiddleWares
app.use(cors());
app.use(express.json({limit: '20mb'}));
app.use(ClerkMiddlewere());

//DB

//Routes
app.get('/', (req, res) => {
    res.send('API working!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});