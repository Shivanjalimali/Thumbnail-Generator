import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import connectDB from "./configs/db.js";
import session from 'express-session'
import Mon, { MongoStore } from 'connect-mongo'
import AuthRouter from "./routes/AuthRoutes.js";
import ThumbnailRouter from "./routes/ThumbnailRoutes.js";
import UserRouter from "./routes/UserRoutes.js";
await connectDB();
import path from "path";
declare module 'express-session'{
    interface SessionData{
        isLoggedIn:boolean;
        userId:string
    }
}
const app = express();


// Middleware
//we can add the url that allowed to acess baceknd server
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5000"

];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman / curl

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


// Serve uploaded files statically
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(join(__dirname, "../uploads")));app.use(session({
    secret:process.env.SESSION_SECRET as string,
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24*7},//7days expiry time
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URL as string,
        collectionName:'sessions'
    })
}))
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use('/api/auth',AuthRouter);
app.use('/api/thumbnail',ThumbnailRouter);
app.use('/api/user',UserRouter)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});