import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { placeOrder, userOrders, validateOrder, listOrders, updateStatus } from '../controllers/orderController.js'

const orderRouter = express.Router()


orderRouter.post('/place', authMiddleware, placeOrder)

orderRouter.post('/validate', authMiddleware, validateOrder)

orderRouter.post('/userorders', authMiddleware, userOrders)

orderRouter.get('/listorders', listOrders)

orderRouter.post('/status', updateStatus)


export default orderRouter