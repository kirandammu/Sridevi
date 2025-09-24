import React, { useState, useEffect } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useAppContext } from '../context/Context'
import { MdAssignmentAdd } from "react-icons/md";

const Navbar = () => {
    const navigate = useNavigate()
    const {user, logout, seller, setShowUser, search, setSearch, getCartCount} = useAppContext()

    useEffect(()=>{
        if (search.length>0) {
            navigate('/products')
        }
    },[search])

    return (
        <nav className="flex sticky top-0 items-center justify-between px-6 md:px-16 lg:px-20 py-3 border-b border-gray-300 bg-white z-30">

            <NavLink to={'/'}>
            <div className='flex items-center mx-auto justify-center gap-2'>
              <p className='w-10 h-0.5 bg-gray-700'></p>
              <div className='font-semibold text-xl uppercase text-[red]'>Sridevi <span className='text-black'>Shopping</span></div>
              <p className='w-10 h-0.5 bg-[red]'></p>
            </div></NavLink>
            <div className="hidden sm:flex items-center gap-8 uppercase">
                
                <NavLink to={'/'}  className={({isActive})=>`${isActive? 'border-b-2 text-[red]' : ''}`} >Home</NavLink>
                <NavLink to={'/products'}  className={({isActive})=>`${isActive? 'border-b-2 text-[red]' : ''}`} >All collections</NavLink>
                {user && <NavLink to={'/myorder'} className={({isActive})=>`${isActive? 'border-b-2 text-[red]' : ''}`}>My Orders</NavLink>}
                <NavLink to={'/contact'} className={({isActive})=>`${isActive? 'border-b-2 text-[red]' : ''}`}>Contact</NavLink>
                
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-md">
                    <input onChange={(e)=>setSearch(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} className='w-4 h-4' alt="" />
                </div>


                {user && (!seller?(<div onClick={()=>navigate('/cart')} className="relative cursor-pointer">
                    < FaShoppingCart className='text-2xl font-bold'/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-[red] w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>):(<div onClick={()=>navigate('/seller')} className="relative cursor-pointer">
                    < MdAssignmentAdd  className='text-2xl font-bold'/>
                </div>))}
                {!user ? (<button onClick={()=>navigate('/login')} className="cursor-pointer px-8 py-2 bg-[red] hover:bg-silver-600 transition text-white rounded-md">
                    Login
                </button>):(<button onClick={()=>logout()} className="cursor-pointer px-5 py-1.5 bg-[red] hover:bg-red-600 transition text-white rounded-md">
                    Logout
                </button>)}
            </div>

        
        </nav>
    )
}

export default Navbar
