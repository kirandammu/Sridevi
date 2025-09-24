import React from 'react'
import Item from './Item'
import { useAppContext } from '../context/Context'
import Title from './Title'

const Discount = () => {

    

  const {products} = useAppContext()
  return (
    <div>
        <Title text1={'Best'} text2={'Discount'}/>
        <div className='grid grid-cols-2 gap-y-2 md:grid md:grid-cols-5 items-center justify-between '>
        {products?.filter((product)=>(Math.floor(((product?.price-product?.offerPrice)/product?.price)*100)>30)).slice(0,5).map((product, index)=>{
          return(
          <div  key={index} >
              <Item product={product} />
          </div>
  )})}
        </div>
    </div>
  )
}

export default Discount
