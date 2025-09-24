import React from 'react'
import { FaClock, FaFacebookMessenger, FaMap, FaPhone } from 'react-icons/fa'
import {assets} from '../assets/assets'
import Title from '../components/Title'
import NewsLetter from '../components/NewsLetter'
const Contact = () => {
  return (
    <div >
        <Title text1={'contact'} text2={'us'}/>
        <NewsLetter/>
      <div className="flex justify-around pt-20">
        <div  className=' flex flex-col p-5  rounded-xl bg-white'>
          <div className='flex p-2' ><FaPhone className=' w-5 h-5 text-[red] rounded m-3 '/>
            <div>
            <span className='text-lg font-semibold'>Phone</span>
            <p className='text-gray-600'>12345679</p>
            <p className='text-gray-600'>(555) 765-4321 (Customer Service)</p>

            </div>
          </div>
          <div className='flex p-2'><FaFacebookMessenger className=' w-5 h-5 text-[red] rounded m-3 '/>
            <div>
            <span className='text-lg font-semibold'>Email</span>
            <p className='text-gray-600'>dammukiran4@gmail.com</p>
            <p className='text-gray-600'>info@newlook.com</p>
            </div>
          </div>
          <div className='flex p-2'><FaMap className=' w-5 h-5 text-[red] rounded m-3 '/>
            <div>
            <span className='text-lg font-semibold'>Address</span>
            <p className='text-gray-600'>123 Fresh Avenue Produce City, PC 12345</p>

            </div>
          </div>
          <div className='flex p-2'><FaClock className=' w-5 h-5 text-[red] rounded m-3 '/>
            <div>
            <span className='text-lg font-semibold'>Store Hours</span>
            <p className='text-gray-600'>Monday - Friday: 7:00 AM - 9:00 PM</p>
            <p className='text-gray-600'>Saturday: 8:00 AM - 8:00 PM</p>
            <p className='text-gray-600'>Sunday: 9:00 AM - 6:00 PM</p>

            </div>
          </div>
      </div>
        <div className='flex items-center mx-auto justify-center gap-2'>
              <p className='w-10 h-0.5 bg-gray-700'></p>
              <div className='font-semibold text-2xl uppercase text-[red]'>New <span className='text-black'>Look</span></div>
              <p className='w-10 h-0.5 bg-[red]'></p>
            </div>
        <div className="flex flex-col gap-3">
          <p className='uppercase text-2xl font-semibold'>Details</p>
          <p>531162 Visakhapatnam <br />Andhra Prdesh, India.</p>
          <p>Mobile: +91 939 020 516 <br />dammukiran4@gmail.com</p>
          <h2 className='text-xl font-semibold pt-3'>Careers at New Look</h2>
          <p>Learn more about our teams and job openings.</p>
          <h4 className='py-4 rounded cursor-pointer bg-[red] text-white flex items-center justify-center w-60'>Explore Jobs</h4>
        </div>
      </div>

    </div>
  )
}

export default Contact
