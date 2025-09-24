import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import Item from '../components/Item'
import { AiOutlineLoading } from "react-icons/ai";
import { useAppContext } from '../context/Context';
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import Title from './Title';
import { FaCartPlus } from 'react-icons/fa';
import { TiTick } from "react-icons/ti";



const Product = () => {

    const {products, addToCart} = useAppContext()
    
    const {id} = useParams()
    const navigate = useNavigate()
    const [thumbnail, setThumbnail] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const pro = products.find(item => item._id === id);


    useEffect(() => {
        if (products.length>0) {
          let productCopy = [...products]
            // productCopy = productCopy.filter((item)=>item.category?.[0] == pro.category)
            productCopy = productCopy.filter(item=>pro.category?.[0] === item.category?.[0]) 
            productCopy = productCopy.filter(item=>pro.subCategory?.[0] === item.subCategory?.[0])

            setRelated(productCopy.slice(0,5))
          setThumbnail(pro.images?.[0] || null);
        }
        setLoading(false);
        
      
    }, [pro]);

    if (loading || !products.find(item => item._id === id)) {
      return <div className='top-0 right-0 left-0 h-[70vh] bottom-0 flex items-center justify-center'><AiOutlineLoading className='animate-spin text-gray-800 text-5xl font-semibold'/></div>;
    }

    

    return (
        <div>
        <div>
            <p className='line-clamp-1 text-sm'>
                <Link to={'/'}>Home</Link> // 
                <Link to={'/products'}> Products</Link> // 
                <Link to={`/products/${pro?.subCategory}`.toLowerCase()}> {pro?.subCategory}</Link> // 
                <span className="text-[red]">  {pro?.name}</span>
            </p>

            <div className="flex flex-col md:flex-row justify-between gap-16 mt-4">
                <div className="flex flex-col-reverse items-center  gap-3 w-1/2">
                    <div className="flex justify-between  gap-x-3 w-[360px] mx-auto ">
                        {pro?.images?.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border w-22 h-22 p-0.5 border-gray-100/30 rounded overflow-hidden flex items-center justify-center cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} className='rounded-md shadow shadow-gray-500' />
                            </div>
                        ))}
                    </div>

                    <div className="bg-white shadow-xl w-[360px] h-[360px] rounded-md overflow-hidden flex items-center justify-center p-4">
                        <img src={thumbnail} alt="Selected product " className='h-[100%] rounded-md' />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-2xl font-medium">{pro.name}</h1>
                    <div className='flex gap-4 items-center  text-[blue]'>
                        <p>{pro.category}</p>
                        <p className='text-[green]'>{pro.subCategory}</p>
                    </div>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            <p key={i} className='text-amber-400'>{i<3 ? (<IoIosStar/> ) : <IoIosStarOutline/>} </p>
                            
                        ))}
                        <p className="text-sm text-gray-600 ml-2 ">{Math.floor(Math.random()*1000)} reviews</p>
                    </div>

                    <div className="mt-2">
                        <div className='flex gap-x-3 items-end'><p className="text-gray-600/70 line-through">MRP: ₹{pro.price}</p><span className='text-green-600 text-xl'>{(Math.floor(((pro?.price-pro?.offerPrice)/pro?.price)*100))}%</span></div>
                        <p className="text-2xl font-medium">MRP: <span className='text-[red]'>₹{pro.offerPrice}</span></p>
                        <span className="text-gray-600/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-3">About product</p>
                    <ul className="list-disc ml-4 text-gray-600/70">
                        {pro.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-5 gap-16 text-base">
                        <button onClick={()=>{addToCart(pro._id)}} className="w-full flex items-center justify-center gap-3 py-2 cursor-pointer font-medium bg-gray-300 rounded-md text-black hover:bg-gray-200 transition" >
                           <FaCartPlus/> Add to Cart
                        </button>
                        <button onClick={()=>{addToCart(pro._id); navigate('/cart'); scrollTo(0,0)}} className="w-full py-2 cursor-pointer font-medium bg-[red] rounded-md text-white hover:bg-green-600 transition" >
                            Buy now
                        </button>
                    </div>
                    <div className='text-gray-500'>
                    <p className="text-base font-medium mt-3 text-gray-900">Delivery Details</p>
                    <p className='flex gap-2 items-center'><TiTick className='text-green-500'/>Free Shipping On Order Over Rs.500</p>
                    <p className='flex gap-2 items-center'><TiTick className='text-green-500'/>Free returns within 7 days</p>
                    </div>
                    </div>
            </div>
        </div>
        <div>

        <div className="hidden md:block w-5xl mx-auto py-6 ">
            <div className="flex">
                <p className='border border-gray-700 rounded-l p-1 px-2'><b>Description</b></p>
                <p className='border border-gray-700 rounded-r p-1 px-2'>Reviews (122)</p>
            </div>
            <div className="border rounded p-2 text-gray-500 text-sm">
                <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea. to provide a platform where customers can easily discover, explore, and purchase a wide range of products from comfort of their homes.</p>
                <p>Since our inception, we've worked tirelessly to create a diverse selection of high-quality prodcuts that cater to every taste and preference . From fashion and beauty to electronics and home essentials, we offer an extensive colleciton sourced from trusted brands and suppliers.</p>
            </div>
        </div>

            {/* ---------Related Products -------------- */}
        <Title text1={'related'} text2={'items'}/>
      <div className='grid gap-4 grid-cols-2 md:grid-cols-5'>{
            related.map((pro,i)=>{
                return(
                <Item key={i} product={pro}/>
            )})
        }</div>
        <p onClick={()=>{navigate('/products'); scrollTo(0,0)}} className='text-center mt-10 mx-auto cursor-pointer p-4 py-2 bg-gray-200 w-32 rounded-xl'>See More</p>
        </div>
        </div>
    );
};
export default Product