import User from '../models/User.js'

export const Admin = async (req,res, next) =>{
    try {
        const userId = req.user._id
        const seller = await User.findById(userId)
        if (seller.role !== 'admin') {
            res.json({success:false, message:'you are not admin'})
        }
        next()
    } catch (error) {
        console.log("Error in seller middleware: ", error.message);
    res.status(500).json({ message: "Internal seller error" });
    }
}