import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    firstName: {type:String},
    lastName: {type:String},
    email: {type:String},
    street: {type:String},
    city:{type:String},
    state:{type:String},
    zipcode:{type:Number},
    country:{type:String},
    phone:{type:Number}
})

const Address = mongoose.models.Address || mongoose.model('Address', addressSchema)
export default Address