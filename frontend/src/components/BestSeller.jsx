import React from 'react'
import Item from './Item'
import { useAppContext } from '../context/Context'
import Title from './Title'

const BestSeller = () => {

  const {products} = useAppContext()
  return (
    <div>
        <Title text1={'latest'} text2={'collections'} /> 
        <div className='grid grid-cols-2 gap-y-4 md:grid md:grid-cols-5 items-center justify-between '>
        {products?.filter((product)=>product).slice(0,10).map((product, index)=>{
          return(
          <div  key={index} >
              <Item product={product} />
          </div>
  )})}
        </div>
    </div>
  )
}

export default BestSeller
