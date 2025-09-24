import express from 'express'
import { addProduct, deleteProduct, productList, singleProduct } from '../controllers/productController.js'
import upload from '../config/multer.js'
import AuthUser from '../middleware/AuthUser.js'
import { Admin } from '../middleware/AuthSeller.js'

const productRoute = express.Router()

productRoute.post('/add', upload.array('images', 4), AuthUser, Admin, addProduct)
productRoute.get('/all', productList)
productRoute.get('/single/:userId', singleProduct)
productRoute.post('/delete/:userId',AuthUser, Admin, deleteProduct)

export default productRoute