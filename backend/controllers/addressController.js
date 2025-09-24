import Address from '../models/Address.js'

export const addAddress = async (req,res) => {
    try {
        const {address} = req.body
        const userId = req.user._id
        const newAddress = await Address.create({...address,userId})
        res.json({success:true, message:'address saved', newAddress})
    } catch (error) {
        res.json({success:false, message:error.message})
        console.log(error.message)
    }   
}

export const getAddress = async (req,res) => {
    try {
        const userId = req.user._id
       const address = await Address.find({userId})
        res.json({success:true, address})
    } catch (error) {
            res.json({success:false, message:error.message})
            console.log(error.message)
    }
}

export const deleteAddress = async (req,res)=>{
    try {
        const {id} = req.params
        await Address.findByIdAndDelete(id)
        res.json({success:true, message:'Address Removed'})


    } catch (error) {
         res.json({success:false, message:error.message})
            console.log(error.message)
    }
}