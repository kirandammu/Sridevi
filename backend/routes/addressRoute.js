import express from 'express'
import AuthUser from '../middleware/AuthUser.js'
import { addAddress, deleteAddress, getAddress } from '../controllers/addressController.js'

const addressRoute = express.Router()

addressRoute.post('/add',AuthUser, addAddress)
addressRoute.get('/get', AuthUser, getAddress)
addressRoute.post('/remove/:id', AuthUser, deleteAddress)

export default addressRoute