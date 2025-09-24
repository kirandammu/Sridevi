import express from 'express'
import AuthUser from '../middleware/AuthUser.js'
import { Admin } from '../middleware/AuthSeller.js'
import upload from '../config/multer.js'
import { addCategory, deleteCategory, getCategorys } from '../controllers/categoryController.js'

const categoryRoute = express.Router()

categoryRoute.post('/add',AuthUser, Admin,upload.single('image'), addCategory)
categoryRoute.get('/get', getCategorys)
categoryRoute.post('/delete/:id', AuthUser, Admin, deleteCategory)

export default categoryRoute