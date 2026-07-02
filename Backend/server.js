import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoutes.js'
import 'dotenv/config.js'
import userRouter from './routes/userRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'

//app config
const app = express()

const PORT = process.env.PORT || 4000

//middlewares
app.use(express.json())

app.use(cors())

connectDB()

app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)


app.get('/', (req, res, next) => {
    res.send("API IS WORKING")
})

app.listen(PORT || 4000, () => {
    console.log(`The server is running on port http://localhost:${port}`)
})