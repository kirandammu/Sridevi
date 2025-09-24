import React from 'react'
import { subCategoriess} from '../assets/assets.js'
import { Link } from 'react-router-dom'
import Title from './Title.jsx'
import { useAppContext } from '../context/Context.jsx'

const Categories = () => {
  const {categorys} = useAppContext()
  return (
    <div className='py-4'>
      <Title text1={'category'} text2={'items'}/>
      <div className='grid grid-cols-3 gap-4 md:flex md:gap-x-6 justify-between '>
        {categorys.map((item, id)=>{
            return(
                <Link onClick={()=>{scrollTo(0,0)}} to={`/products/${item.name.toLowerCase()}`} key={id} className={`w-24 md:w-32 rounded-md flex flex-col justify-center md:pb-2 border border-gray-200 shadow-2xl`}>
                    <img src={item.image} className='h-24 md:h-32' />
                    <p className='text-center text-sm font-semibold text-gray-800 '>{item.name}</p>
                </Link>
            )
        })}
      </div>
    </div>
  )
}

export default Categories
