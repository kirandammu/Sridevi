import React, { useState , useEffect} from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/Context";
import { AiOutlineLoading } from 'react-icons/ai';
import toast from "react-hot-toast";
import Title from "../../components/Title";


const BannersData = () => {
    const { axios } = useAppContext();
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [banners, setBanners] = useState([])
  
  
    const getBanners =async ()=>{
      const {data} = await axios.get('/banner/get')
      setBanners(data.banners)
    }

    const removeBanner = async (id)=>{
        const {data} = await axios.post(`/banner/delete/${id}`)
        if (data.success) {
            toast.success(data.message)
            getBanners()
        }
    }
    
    useEffect(()=>{
      getBanners()
      removeBanner()
    },[])


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create a new FormData object
      const formData = new FormData();
      // Append the image file to the FormData object with the key your backend expects
      // For example, if your backend expects the file under the key 'image', use 'image'
      // If your backend expects a different key, change 'image' to match
      formData.append('image', image);

      // Send the FormData object with Axios
      const { data } = await axios.post('/banner/add', formData);
      console.log(data);

      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setLoading(false);
        getBanners()
      } else {
        toast.error(data.message || "Failed to upload image.");
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred during upload.");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex-1 h-[90vh] overflow-y-scroll flex flex-col justify-between">
        <form
          onSubmit={onSubmitHandler}
          className="md:p-10 p-4 space-y-5 max-w-lg"
        >
          <div className="flex flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                className='w-32 my-3 cursor-pointer'
                alt="Upload area"
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id='image'
              hidden
              required
            />
          </div>
          <button
            type="submit"
            className="px-12 py-1.5 cursor-pointer bg-[red] text-white font-medium rounded"
            disabled={loading}
          >
            {loading ? (
              <AiOutlineLoading className="text-xl font-bold animate-spin" />
            ) : (
              "ADD"
            )}
          </button>
        </form>
        <div>
            <Title text1={'all'} text2={'banners'}/>
            <div className="w-4xl mx-auto gap-4 flex flex-col items-center ">
                {banners.map((item)=>{
                    return (
                        <div key={item._id} className="w-3xl relative">
                            <img src={item.image} alt="" className="w-3xl rounded-2xl" />
                            <button onClick={()=>removeBanner(item._id)} className="cursor-pointer bg-white text-[red] border-[red] border px-2 p-1 rounded absolute top-2 right-3">delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BannersData;
