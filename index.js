import express from "express";
import cors from 'cors';
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";


// express.Router() import
import router from "./routes/api.js";
import { DATABASE, MAX_JSON_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME_LIMIT, URL_INCODE, WEB_CASH } from "./app/config/config.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_INCODE}));
app.set('etag', WEB_CASH);

// === ./routes/api.js Connection
app.use('/api', router);

// === rateLimit
const limiter = rateLimit({
    windowMs: REQUEST_TIME_LIMIT,
    limit: REQUEST_NUMBER
})
app.use(limiter);

// Database Connection
mongoose.connect(DATABASE, {
    autoIndex: true
}).then(() => {
    console.log("Successfully connected to MongoDB")
}).catch((error) => {
    console.log(error);
})

app.listen(PORT, (req, res) => {
    console.log(`Server port ${PORT} has running Successful`);
})