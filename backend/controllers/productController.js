import Product from '../models/Product.js'
import {v2 as cloudinary} from 'cloudinary'

// Add product --  /product/add
export const addProduct = async (req, res)=>{
try {
    let products = JSON.parse(req.body.products)
    const images = req.files
    let imageUrl = await Promise.all(images.map(async (item)=>{
        let result = await cloudinary.uploader.upload(item.path)
        return result.secure_url
    }))
    await Product.create({...products, images:imageUrl})
        res.json({success:true, message:'product added'});
} catch (error) {
    console.log(error.message)
    res.json({success:false, message:error.message});
}
}


// product list --  /product/list
export const productList = async (req, res)=>{
    try {
        const allProducts =await Product.find({}).sort({ createdAt: -1 })
        res.json({success:true, allProducts})
    } catch (error) {
            res.json({success:false, message:error.message})
    }
}

// get single productbyId --  /product/single
export const singleProduct = async (req, res)=>{
    try {
        const {userId} = req.params
        const single = Product.findById(userId)
        res.json({success:true, message:single})
    } catch (error) {
            res.json({success:false, message:error.message})
    }
}

export const deleteProduct = async (req, res)=>{
    try {
        const {userId} = req.params
            await Product.findByIdAndDelete(userId)
        res.json({success:true, message:'Product Deleted'})
    } catch (error) {
        res.json({success:false, message:error.message}) 
    }
}