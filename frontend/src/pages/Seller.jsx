import React from 'react'
import { assets } from '../assets/assets';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/Context';

const Seller = () => {

    const {logout, user} = useAppContext()


    const sidebarLinks = [
        { name: "Add Products", path: "/seller", icon: assets.add_icon },
        { name: "Banners", path: "/seller/banners", icon: assets.product_list_icon },
        { name: "Add Category", path: "/seller/category", icon: assets.add_icon },
        { name: "Products List", path: "/seller/list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon},
    ];

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white ">
                <NavLink to={'/'}>
                            <div className='flex items-center mx-auto justify-center gap-2'>
                              <p className='w-10 h-0.5 bg-gray-700'></p>
                              <div className='font-semibold text-xl uppercase text-[red]'>Sridevi <span className='text-black'>Shopping</span></div>
                              <p className='w-10 h-0.5 bg-[red]'></p>
                            </div></NavLink>
                                <div className="flex items-center gap-5 text-[red]">
                    <p>Hi! {user.name} </p>
                    <button onClick={logout} className='border bg-[red] text-white cursor-pointer rounded text-sm px-4 py-1.5'>Logout</button>
                </div>
            </div>
            <div className='flex'>
                <div className="md:w-64 w-16 border-r h-[600px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item, index) => (
                    <NavLink to={item.path} key={index} end={item.path === '/seller'}
                        className={({isActive})=>`flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] bg-gray-500/10 border-[red] text-[red]"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`
                        }
                    >
                        <img src={item.icon} alt="" />
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
            </div> 
            <Outlet />
            </div>
        </>
    );
};

  


export default Seller
