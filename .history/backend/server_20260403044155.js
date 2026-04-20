import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './config/db.js';
import path from 'path';
import invoiceRouter from './routes/invoiceRouter.js';
const app = express();
const port = 4000;

// Middlewares
app.use(cors());
app.use(clerkMiddleware()); // ✅ correct
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// DB
connectDB();

// Routes
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/invoices', invoiceRouter);
app.

app.get('/', (req, res) => {
    res.send('API working!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});