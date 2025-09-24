import React, { useEffect, useState } from 'react'
import Item from '../components/Item'
import { useAppContext } from '../context/Context'

const Related = ({category}) => {
    console.log(category)

    const [related,setRelated] = useState([])
    const {product} = useAppContext()
        console.log(product)


   useEffect(()=>{
    let productCopy = product.slice();
    console.log(productCopy)

    if(product.length>0){
        for (let i = 0; i < product.length; i++) {
        productCopy = productCopy.filter((item)=>category === item?.category)
        setRelated(productCopy.slice(0,5))
    }
    }
   },[product])

  return (
    <div className="related">
        <div className="display">
            {related.map((item, index)=>(
                <Item key={index} id={item._id} name={item.name} price={item.price} image={item.image} offerPrice = {item.offerPrice} />
            )
            )}
        </div>

    </div>
  )
}

export default Related
