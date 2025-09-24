import React from 'react'
import Title from './Title'
import { MdHeadsetMic } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { RiExchangeFundsLine } from "react-icons/ri";

const NewsLetter = () => {

     const customersupport = [
  { icon:<MdHeadsetMic />,
    title:'Best Customer Support',
    subject:'We provide 24/7 customer support'},
  { icon:<TiTick />,
    title:'7 Days Return Policy',
    subject:'We provide 7 days free return policy'},
  { icon:<RiExchangeFundsLine />,
    title:'Easy Exchange Policy',
    subject:'We offer hassle free exchange policy'},
]
    
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-2 mt-15">
            <div className='grid md:flex justify-between items-center md:w-5xl'>
                {customersupport.map((news, i)=>{
                    return(
                        <div key={i} className='flex flex-col items-center justify-center gap-1 cursor-pointer'>
                            <p className='bg-black font-bold text-white rounded text-2xl p-2'>{news.icon}</p>
                            <p className='text-[black] font-semibold'>{news.title}</p>
                            <p className='text-gray-500'>{news.subject}</p>
                        </div>
                    )
                })}
            </div>
            <Title text1={'! never miss'} text2={'a deal !'}/>
            <p className=" text-gray-500/70">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>
            <form className="flex items-center justify-between max-w-xl w-full h-10">
                <input
                    className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                    type="text"
                    placeholder="Enter your email id"
                    required
                />
                <button type="submit" className=" px-8 h-full text-white bg-[red] hover:bg-red-600 transition-all cursor-pointer rounded-md rounded-l-none">
                    Subscribe
                </button>
            </form>
        </div>
    )
}

export default NewsLetter