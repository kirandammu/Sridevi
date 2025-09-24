import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const Item = ({product}) => {

  const navigate = useNavigate()

  return (
    <div onClick={()=>{navigate(`/products/${String(product.category).toLowerCase()}/${product._id}`); window.scrollTo({top: 0, behavior: 'smooth'})}} className="bg-white cursor-pointer w-40 md:w-50 rounded-md pb-4 overflow-hidden border border-gray-500/30 shadow shadow-amber-300">
        <div className='w-40 h-40 md:h-48 overflow-hidden flex items-center justify-center md:w-50 md:mx-auto relative'><img className=" border-b rounded w-full h-[90%] px-0.5 border-gray-200" src={product.images?.[0]}/><p className='absolute top-0.5 left-0.5 flex items-center justify-center bg-[red] text-white p-1 py-1.5 rounded text-[10px]'>{(Math.floor(((product?.price-product?.offerPrice)/product?.price)*100))}%</p></div>
        <div className="flex flex-col items-start px-3">
            <p className="text-red-500 text-xs md:text-sm mt-2">{product.category}</p>
            <p className="text-sm md:text-base font-semibold line-clamp-2 h-12 ">{product.name}</p>
            <div className='flex gap-x-4 items-center'>
                <p className="font-medium text-gray-500 line-through">₹{product.price}</p>
                <p className="font-semibold text-xl text-[red]">₹{product.offerPrice}</p>
            </div>
        </div>
    </div>
  )
}

export default Item
