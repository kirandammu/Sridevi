import React from 'react'
import { subCategoriess} from '../assets/assets'
import { useParams } from 'react-router-dom'
import Item from '../components/Item'
import { useAppContext } from '../context/Context'
import Title from '../components/Title'

const ProductSubCategory = () => {

    const {products} = useAppContext()
    const {subCategory} = useParams()
    console.log(products)

    const searchCategory = subCategoriess.find((item)=>item.path.toLowerCase()=== subCategory)

    const filterProducts = products.filter((product)=>String(product.subCategory).toLowerCase()=== subCategory)

  return (
    <div>
      {searchCategory && (
        <div>
            <Title text1={'latest'} text2={searchCategory.text.toUpperCase()}/>
            {filterProducts.length>0 ? (
            <div className='flex gap-5 flex-wrap items-center'>
                {filterProducts.map((product)=>(
                    <Item key={product._id} product={product}/>
                ))}
            </div>):(<div className='flex items-center justify-center h-[70vh]'>
                <p className='text-2xl font-medium text-[red]'>No products found in this category.</p>
            </div>)}
        </div>
      )}
    </div>
  )
}

export default ProductSubCategory
