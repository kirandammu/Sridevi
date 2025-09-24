import Category from '../models/Category.js'
import {v2 as cloudinary} from 'cloudinary'


export const addCategory = async (req,res) => {
    try {
        const {name} = req.body
        const image = req.file
        let imageUrl = await cloudinary.uploader.upload(image.path)
        const CategoryImage =  imageUrl.secure_url

        await Category.create({image:CategoryImage, name})
        return res.json({message:' Category Added', success:true})
    } catch (error) {
        res.json({success:false, message:error.message})
        console.log(error.message)
    }   
}

export const getCategorys = async (req,res) => {
    try {
       const Categorys = await Category.find({})
        res.json({success:true, Categorys})
    } catch (error) {
            res.json({success:false, message:error.message})
            console.log(error.message)
    }
}

export const deleteCategory = async (req,res)=>{
    try {
        const {id} = req.params
        await Category.findByIdAndDelete(id)
        res.json({success:true, message:'Category Removed'})
    } catch (error) {
         res.json({success:false, message:error.message})
            console.log(error.message)
    }
}