import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import postRoutes from './routes/postRoutes.js'
import bottlePostsRoute from './routes/bottlePostRoutes.js'

const app = express()
dotenv.config()

//Connect to DB
connectDB();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cors())
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(express.json({ limit: '50mb' }));


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/dashboard', postRoutes);
app.use('/api/bottle', bottlePostsRoute);

app.get('/order/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('Api is running')
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))