import Banner from '../models/Banner.js'
import {v2 as cloudinary} from 'cloudinary'


export const addBanner = async (req,res) => {
    try {
        const image = req.file
        let imageUrl = await cloudinary.uploader.upload(image.path)
        const bannerImage =  imageUrl.secure_url

        await Banner.create({image:bannerImage})
        return res.json({message:' Banner Added', success:true})
    } catch (error) {
        res.json({success:false, message:error.message})
        console.log(error.message)
    }   
}

export const getBanners = async (req,res) => {
    try {
       const banners = await Banner.find({})
        res.json({success:true, banners})
    } catch (error) {
            res.json({success:false, message:error.message})
            console.log(error.message)
    }
}

export const deleteBanner = async (req,res)=>{
    try {
        const {id} = req.params
        await Banner.findByIdAndDelete(id)
        res.json({success:true, message:'Banner Removed'})
    } catch (error) {
         res.json({success:false, message:error.message})
            console.log(error.message)
    }
}