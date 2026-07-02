import userModel from "../models/userModel.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const storedUser = await userModel.findOne({ email })
        if (storedUser) {
            return res.json({ success: false, message: 'User already exists' })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, data: token })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }

}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const storedUser = await userModel.findOne({ email })

        if(!storedUser)
        {
            return res.json({success: false, message: 'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password, storedUser.password)

        if(!isMatch)
        {
            return res.json({success: false, message: 'Invalid Credentials'})
        }

        const token = createToken(storedUser._id)
        return res.json({success: true, token: token})

    } 
    
    catch (error) {
        console.log(error)
        res.json({success: false, message: 'Error'})
    }



}

export { registerUser, loginUser }