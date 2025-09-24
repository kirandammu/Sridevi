import React, { useState } from 'react'
import { assets } from '../assets/assets';
import { FaMapLocationDot } from "react-icons/fa6";
import { useAppContext } from '../context/Context';
import toast from 'react-hot-toast';
import Title from '../components/Title';


const Address = () => {

    const {axios, navigate} = useAppContext()
     const [data, setData] = useState({
      firstName:'',
      lastName:'',
      email:'',
      street:'',
      city:'',
      state:'',
      zipcode:'',
      country:'',
      phone:''
    })
  const onChangeHandler = (e)=>{
      const name = e.target.name;
      const value= e.target.value;
      setData((data)=>({...data,[name]:value}))
  }

  const onsubmit =async (e)=>{
    console.log(data)
    e.preventDefault()
    const response =await axios.post('/address/add', {address:{...data}})
    console.log(response.data)
     if(response.data.success){
      toast.success(response.data.message)
      navigate('/cart')
    }
  }

  return (
        <div className='flex justify-between px-20'>
      <div className="flex flex-col w-[430px] justify-between gap-y-3">
      <Title text1={'add'} text2={'address'} />
       <div className="flex items-center justify-between ">
          <input required type="text" placeholder='First name' onChange={onChangeHandler} value={data?.firstName} name='firstName' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
          <input required type="text" placeholder='Last name' onChange={onChangeHandler} value={data?.lastName} name='lastName' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
        </div>
          <input required type="text" placeholder='Email Address' onChange={onChangeHandler} value={data.email} name='email' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
          <input required type="text" placeholder='Street' onChange={onChangeHandler} value={data.street} name='street' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
        <div className="flex items-center justify-between">
          <input required type="text" placeholder='City' onChange={onChangeHandler} value={data.city} name='city' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
          <input required type="text" placeholder='State' onChange={onChangeHandler} value={data.state} name='state' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
        </div>
        <div className="flex items-center justify-between">
          <input required type="text" placeholder='Zip code' onChange={onChangeHandler} value={data.zipcode} name='zipcode' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
          <input required type="text" placeholder='Country' onChange={onChangeHandler} value={data.country} name='country' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
        </div>
        <input required type="text" placeholder='Phone Number' onChange={onChangeHandler} value={data.phone} name='phone' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
        <button onClick={onsubmit} className='border border-gray-400 bg-black text-white px-2 outline-none rounded font-medium cursor-pointer py-1.5'>SAVE ADDRESS</button>
        </div>
        <img src={assets.add_address_iamge} alt="address" className='h-60' />
        {/* <FaMapLocationDot className='text-[300px] font-bold'/> */}

        </div>

  )
}

export default Address
