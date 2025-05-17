import express from 'express'
import cors from 'cors'
import {UAParser} from 'ua-parser-js'
import axios from 'axios'
import trackRoute from './routes/track.route.js';
const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use('/', trackRoute);
export {app} 