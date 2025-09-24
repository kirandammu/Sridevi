import express from 'express'
import AuthUser from '../middleware/AuthUser.js'
import { getAllOrders, getUserOrder, placeOrderCOD, placeOrderStripe, stripeVerify, updateStatus } from '../controllers/OrderController.js'
import { Admin } from '../middleware/AuthSeller.js'

const router = express.Router()

router.post('/cod', AuthUser, placeOrderCOD)
router.post('/stripe', AuthUser, placeOrderStripe)
router.post('/verify', AuthUser, stripeVerify)
router.post('/status', AuthUser, Admin, updateStatus)
router.get('/userOrder', AuthUser, getUserOrder)
router.get('/allOrders', AuthUser, Admin, getAllOrders)

export default router