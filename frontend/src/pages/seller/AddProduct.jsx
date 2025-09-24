import React, { useState } from 'react'
import { assets, categoriess, subCategoriess } from '../../assets/assets';
import toast from 'react-hot-toast';
import { AiOutlineLoading } from 'react-icons/ai';
import { useAppContext } from '../../context/Context';

const AddProduct = () => {
    const { axios , categorys} = useAppContext()
    const [files, setFiles] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setsubCategory] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [loading, setloading] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setloading(true)
        
        try {
            const products = {
                name, 
                description: description.split('\n'), 
                category, 
                subCategory,
                price, 
                offerPrice 
            }

            const formData = new FormData();
            formData.append('products', JSON.stringify(products))
            
            files.forEach(file => {
                if (file) formData.append('images', file)
            })

            const { data } = await axios.post('/product/add', formData)

            if (data.success) {
                toast.success(data.message)
                setName('')
                setDescription('')
                setCategory('')
                setsubCategory('')
                setPrice('')
                setOfferPrice('')
                setFiles([])
            } else {
                toast.error(data.message || 'Failed to add product')
            }
        } catch (error) {
            console.error('Submission error:', error)
            toast.error(error.response?.data?.message || 'An error occurred')
        } finally {
            setloading(false)
        }
    }

    return (
        <div className="flex-1 h-[90vh] overflow-y-scroll flex flex-col justify-between">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
               <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input onChange={(e)=>{
        const updatedFiles = [...files];
        updatedFiles[index] = e.target.files[0]
        setFiles(updatedFiles)
    }} type="file" id={`image${index}`} hidden />
                            <div className='h-24 p-1 w-24 flex items-center justify-center'> <img className=" cursor-pointer w-full h-full " src={files[index]?URL.createObjectURL(files[index]): assets.upload_area} alt="uploadArea"  /></div>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input onChange={(e)=>setName(e.target.value)} value={name} id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea value={description} onChange={(e)=>setDescription(e.target.value)} id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className='flex w-full justify-between gap-x-4'>
                    <div className="w-1/2 flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select id="category" onChange={(e)=>setCategory(e.target.value)} value={category} className="outline-none py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                       {categoriess.map((item, index)=>(
                        <option key={index} value={item.text}>{item.text}</option>
                       ))}
                    </select>
                </div>
                <div className="w-1/2 flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="subCategory">SubCategory</label>
                    <select id="subCategory" onChange={(e)=>setsubCategory(e.target.value)} value={subCategory} className="outline-none py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select SubCategory</option>
                       {categorys.map((item, index)=>(
                        <option key={index} value={item.name}>{item.name}</option>
                       ))}
                    </select>
                </div>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input onChange={(e)=>setPrice(e.target.value)} value={price} id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input onChange={(e)=>setOfferPrice(e.target.value)} value={offerPrice} id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="px-12 py-1.5 cursor-pointer bg-[red] text-white font-medium rounded"
                    disabled={loading}
                >
                    {loading ? <AiOutlineLoading className='text-xl font-bold animate-spin'/>: 'ADD'}
                </button>
            </form>
        </div>
    )
}

export default AddProduct 
 
 
 