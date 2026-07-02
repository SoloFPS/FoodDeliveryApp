import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import stripe from 'stripe'
import Razorpay from 'razorpay'
import crypto, { Hmac } from 'crypto'

const placeOrder = async (req, res) => {

    try {

        const { amount, currency, receipt } = req.body
        const razorpay = new Razorpay({
            key_id: process.env.TEST_API_KEY,
            key_secret: process.env.TEST_KEY_SECRET
        })

        const order = await razorpay.orders.create({ amount: amount * 100, currency, receipt })

        if (!order) {
            return res.status(500).json({ success: false, message: 'order is null' })
        }

        res.json({ success: true, order })
    }

    catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }


}

const validateOrder = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    const newOrder = await orderModel.create({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: Number(req.body.phone)
    })


    const signature = crypto.createHmac('sha256', process.env.TEST_KEY_SECRET)
    signature.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const digest = signature.digest('hex')
    if (digest != razorpay_signature) {
        return res.status(400).json({
            message: 'Transaction is not legit'
        })
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartItems: [] })

    res.json({
        success: true,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
    })
}

const userOrders = async (req, res) => {
    try {
        const userId = req.body.userId
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    }

    catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }

}

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find()
        res.json({ success: true, orders })
    } 
    
    catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error'})
    }

}

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({ success: true, message: 'status updated successfully'})
    } 
    
    catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}

export { placeOrder, validateOrder, userOrders, listOrders, updateStatus }