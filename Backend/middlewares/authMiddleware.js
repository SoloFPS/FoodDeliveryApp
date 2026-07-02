import jwt from 'jsonwebtoken'
const authMiddleware = (req, res, next) =>
{

    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    if(!token)
    {
        return res.json({ success: false, message: 'unable to authorize please login again'})
    }

    try {
        const tokenDecoded =  jwt.verify(token ,process.env.JWT_SECRET)
        req.body.userId = tokenDecoded.id
        next()
    } 
    
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: 'Error'})
    }
    

}

export default authMiddleware