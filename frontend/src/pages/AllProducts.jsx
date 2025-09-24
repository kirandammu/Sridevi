import React, { useEffect, useState } from 'react'
import Item from '../components/Item'
import { useAppContext } from '../context/Context'
import Title from '../components/Title'
import Pagination from '../components/Pagination'
import { categoriess, subCategoriess } from '../assets/assets'

const AllProducts = () => {
    const {products, search, categorys} = useAppContext()
    const [filterProducts, setFilterProducts] = useState([])
    const [sortType,setSortType] = useState('Relavent')
    const [category,setCategory ] = useState([]);
    const [subCategory,setSubCategory] = useState([]);
    const [priceRange, setPriceRange] = useState([0,50000])

    
      const toggleCategory = (e)=>{
        if (category.includes(e.target.value)) {
          setCategory(prev=> prev.filter(item => item !== e.target.value))
        }
        else{
          setCategory(prev => [...prev,e.target.value])
        }
      }
    
      const toggleSubCategory = (e)=>{
        if (subCategory.includes(e.target.value)) {
          setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else{
          setSubCategory(prev => [...prev,e.target.value])
        }
      }
  const applyFilter = ()=>{
    
    let productCopy = products.slice()

    if(category.length>0){
      productCopy = productCopy.filter(item => (category.includes(item.category?.[0])))
    }
    if(subCategory.length>0){
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory?.[0]))
    }
    productCopy = productCopy.filter(item => 
        item.offerPrice >= priceRange[0] && item.offerPrice <= priceRange[1]
    );
    setFilterProducts(productCopy)
  }


    
  const sortProducts = () => {

    let fpCopy = filterProducts.slice()

    switch (sortType) {
      case 'Low-High':
        setFilterProducts(fpCopy.sort((a,b)=>(a.offerPrice-b.offerPrice)))
        break;

      case 'High-Low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.offerPrice-a.offerPrice)))
        break;

      default:
        applyFilter()
        break;
    }
  }

  useEffect(()=>{
    applyFilter()
  },[category,subCategory,search, priceRange])

  useEffect(()=>{
    sortProducts()
  },[sortType])

    useEffect(()=>{
        if (search.length>0) {
            setFilterProducts(products.filter(item=>item.name.toLowerCase().includes(search.toLowerCase())))
        }
        else{setFilterProducts(products)}
    },[products,search])

  return (
    <div>
      <Title text1={'all'} text2={'collections'}/>
      <div className='flex flex-col md:flex-row w-6xl gap-4'>
        <div className='w-fit md:w-1/5 h-fit md:sticky top-40 '>
            <div className='flex items-center justify-start gap-2 p-4'>
              <p className='w-8 h-0.5 bg-gray-700'></p>
              <div className='font-semibold text-md uppercase text-[red]'>filter <span className='text-black'>items</span></div>
              <p className='w-8 h-0.5 bg-[red]'></p>
            </div>
        <div className='mb-4 mr-6'>
          <label>Price Range:  ₹{priceRange[0]}- ₹{priceRange[1]}</label>
          <input type="range" min='0' max='50000' value={priceRange[1]} onChange={(e)=>setPriceRange([priceRange[0],Number(e.target.value)])} className='w-full accent-[red]' />
        </div>
        <div className="subcategory">
          <h3 className=' font-semibold'>CATEGORY</h3>
          {categoriess.map((item,i)=><p key={i} className='flex gap-1.5'><input type="checkbox" value={item.text} id={item.text} onChange={toggleCategory}/><label htmlFor={item.text}>{item.text}</label></p>)}
        </div>
        <div className="subcategory">
          <h3 className='pt-3 font-semibold'>TYPE</h3>
          {categorys.map((item,i)=><p key={i} className='flex gap-1.5'><input type="checkbox" value={item.name} id={item.name} onChange={toggleSubCategory}/><label htmlFor={item.name}>{item.name}</label></p>)}
          </div>
        </div>
        <div className='md:w-4/5'>
          
      
      <Pagination items={filterProducts} itemsPerPage={12} setSortType={setSortType}/>
        </div>
      </div>
    </div>
  )
}

export default AllProducts
