import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Login from './components/Login'
import Error from './pages/Error'
import AllProducts from './pages/AllProducts'
import Product from './components/Product'
import Cart from './pages/Cart'
import Seller from './pages/Seller'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import Contact from './pages/Contact'
import { useAppContext } from './context/Context'
import Address from './pages/Address'
import MyOrders from './pages/MyOrders'
import Verify from './pages/Verify'
import BannersData from './pages/seller/BannersData'
import ProductSubCategory from './pages/productSubCategory'
import AddCategory from './pages/seller/AddCategory'

const App = () => {
  

  const{ seller} = useAppContext()

  const isSellerPath = useLocation().pathname.includes('seller')
 

  return   (
    <div>
      {!isSellerPath && <Navbar/> }

      <div className={`${isSellerPath ? '':'px-6 md:px-16 lg:px-32 py-10'}`}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/products' element={<AllProducts/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/myorder' element={<MyOrders/>}/>
          <Route path='/products/:subCategory' element={<ProductSubCategory/>}/>
          <Route path='/products/:category/:id' element={<Product/>}/>
          <Route path='/address' element={<Address/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/seller' element={seller ?<Seller/>: <Navigate to={'/'}/>}>
              <Route index element={seller? <AddProduct/>: null}/>
              <Route path='banners' element={<BannersData/>}/>
              <Route path='category' element={<AddCategory/>}/>
              <Route path='list' element={<ProductList/>}/>
              <Route path='orders' element={<Orders/>}/>   
          </Route>
          <Route path='*' element={<Error/>} />
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App
