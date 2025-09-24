import express from 'express'
import AuthUser from '../middleware/AuthUser.js'
import { Admin } from '../middleware/AuthSeller.js'
import { addBanner, deleteBanner, getBanners } from '../controllers/bannersController.js'
import upload from '../config/multer.js'

const bannerRoute = express.Router()

bannerRoute.post('/add',AuthUser, Admin,upload.single('image'), addBanner)
bannerRoute.get('/get', getBanners)
bannerRoute.post('/delete/:id', AuthUser, Admin, deleteBanner)

export default bannerRoute