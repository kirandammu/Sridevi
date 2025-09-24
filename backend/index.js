import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import cloudinaryConnect from './config/cloudinary.js'
import addressRoute from './routes/addressRoute.js'
import OrderRoute from './routes/orderRoute.js'
import bannerRoute from './routes/bannerRoute.js'
import categoryRoute from './routes/categoryRoute.js'


const app = express()
const port = 4500

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:'https://sridevi.vercel.app', credentials:true}))

//configurations
connectDB()
cloudinaryConnect()

//routes
app.use('/user', userRoute)
app.use('/product', productRoute)
app.use('/address', addressRoute)
app.use('/order', OrderRoute)
app.use('/banner', bannerRoute)
app.use('/category', categoryRoute)

app.get('/', (req,res)=> res.send('<h1>Hello shopping world</h1>'))

app.listen(port, ()=>console.log(`server is running at ${port}`))
