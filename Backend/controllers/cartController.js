import userModel from '../models/userModel.js'

const addToCart = async (req, res) => {
    try {

        const user = await userModel.findOne({ _id: req.body.userId })

        if (!user) {
            return res.json({ success: false, message: 'user does not exist' })
        }
        const userCart = user.cartItems
        if (!userCart[req.body.itemId]) {
            userCart[req.body.itemId] = 1
        }

        else {
            userCart[req.body.itemId] += 1
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartItems: userCart })

        return res.json({ success: true, data: 'added to cart' })

    }

    catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}

const removeFromCart = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId)
        const userCart = user.cartItems
        if (user.cartItems[req.body.itemId] > 0) {
            user.cartItems[req.body.itemId] -= 1
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartItems: userCart })
        res.json({ success: true, message: 'item removed successfully' })
    }

    catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}

const getCart = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId)
        const userCart = user.cartItems
        res.json({ success: true, cartItems: userCart })
    }

    catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }

}

export { addToCart, removeFromCart, getCart }