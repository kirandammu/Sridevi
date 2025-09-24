import Order from "../models/Order.js"
import Product from "../models/Product.js"
import Stripe from 'stripe'
import User from "../models/User.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, address } = req.body;
    if (!address || !items || items.length === 0) {
      return res.json({ message: "Invalid order details", success: false });
    }
    // calculate amount using items;
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add tex charfe 2%
    amount += Math.floor((amount * 2) / 100);
    const orders = await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });
    res.json({ message: "Order placed successfully", success: true , orders});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const placeOrderStripe = async (req, res) => {
    const { origin } = req.headers;
    try {
        const userId = req.user._id;
        const { items, address } = req.body;
        if (!address || !items || items.length === 0) {
            return res.json({ message: "Invalid order details", success: false });
        }

        // Fetch product details for all items in the order
        // and create the line_items array for Stripe
        const line_items = await Promise.all(
            items.map(async (item) => {
                const product = await Product.findById(item.product);
                if (!product) {
                    throw new Error(`Product with ID ${item.product} not found`);
                }
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: product.name,
                        },
                        // Use the price from the database lookup
                        unit_amount: product.offerPrice * 100 
                    },
                    quantity: item.quantity
                };
            })
        );
        
        // Add delivery charges to the line items
        line_items.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: 40 * 100
            },
            quantity: 1
        });

        // Calculate amount using items from the database lookup
        const amount = line_items.reduce((total, item) => {
            // Note: unit_amount is already in cents, so we divide by 100 for our total
            return total + (item.price_data.unit_amount / 100) * item.quantity;
        }, 0);

        // Add tex charfe 2%
        const finalAmount = amount + Math.floor((amount * 2) / 100);

        const orders = await Order.create({
            userId,
            items,
            address,
            amount: finalAmount, // Save the final calculated amount
            paymentType: "Online",
            isPaid: false,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${origin}/verify?success=true&orderId=${orders._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${orders._id}`
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || error.toString() });
    }
}



export const getUserOrder = async (req,res)=>{
    try {
        const userId = req.user._id
        const orders = await Order.find({userId}).populate("items.product address").sort({createdAt:-1})
        res.json({success:true, orders})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const getAllOrders = async (req,res)=>{
    try {
        const orders = await Order.find({
            $or:[{paymentType:"COD"}, {paymentType:"Online"}]
        }).populate("items.product address").sort({createdAt:-1})
        res.json({success:true, orders})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const stripeVerify = async (req,res)=>{
    const { orderId, success} = req.body
    try {
        if (success === 'true') {
            await Order.findByIdAndUpdate(orderId, {payment:true})
            await User.findByIdAndUpdate(req.user._id, {cartItems:{}})
            res.json({success:true, message:'payment success'})
        } else{
            await Order.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'error'})
    }
}

export const updateStatus = async (req,res)=>{
    try {
        const {orderId, status} = req.body
        await Order.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:'Status Updated'})
    } catch (error) {
        res.json({success:false, message:error})
        console.log(error)
    }
}