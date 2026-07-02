import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food items

const addFood = async (req, res) => {
    let imageFileName = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: imageFileName
    })

    try {
        console.log(req.body, req.file)
        await food.save()
        res.json({ success: true, message: 'Food added successfully'})
    } 
    
    catch (error) {
        console.log(`unable to add food error: ${error}`)
        res.json({ success: false, message: 'Error unable to add food'})
    }
}

const listFood = async (req, res) => {
    try {
        const foodItems = await foodModel.find()
        res.json({ success: true, data: foodItems })
    } 
    
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error"})
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)

        if(!food)
        {
            return res.json({
                success: false, message: 'food not found'
            })
        }
        
        fs.unlink(`uploads/${food.image}`, (error) => {
            if(error) {
                console.log(error)
                return
            }
            console.log("image deleted successfully")
        })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: 'food was removed'})
    } 
    
    catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error'})
    }
}

export { addFood, listFood, removeFood }