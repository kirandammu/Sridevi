import React from 'react'
import { useAppContext } from '../context/Context'
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const Verify = () => {

    const {navigate, axios, user, setCartItems} = useAppContext()
    const [search, setSearch] = useSearchParams()

    const success = search.get('success')
    const orderId = search.get('orderId')

    const verifyPayment = async()=>{
        try {

        const response = await axios.post(`/order/verify`, {success, orderId})
        console.log(response)

        if (response.data.success) {
            navigate('/myorder')
            setCartItems({})
            toast.success(response.data.message)
        }
        
        else{
            navigate('/cart')
            toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        verifyPayment()
    },[user])

  return (
    <div>
      
    </div>
  )
}

export default Verify
