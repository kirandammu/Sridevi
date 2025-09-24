import React from 'react'
import { categoriess} from '../assets/assets'
import { useParams } from 'react-router-dom'
import Item from '../components/Item'
import { useAppContext } from '../context/Context'
import Title from '../components/Title'

const ProductCategory = () => {

    const {products} = useAppContext()
    const {category} = useParams()
    console.log(products)
    console.log(category)

    const searchCategory = categoriess.find((item)=>item.path.toLowerCase()=== category)

    const filterProducts = products.filter((product)=>String(product.category).toLowerCase()=== category)

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

export default ProductCategory
