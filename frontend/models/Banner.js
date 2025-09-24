import mongoose from 'mongoose'

const BannerSchema = new mongoose.Schema({
    image:{type:String, required:true},
})

const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema)
export default Banner