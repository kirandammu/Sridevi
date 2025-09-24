import React, {useState, useEffect} from 'react'
import { useAppContext } from '../context/Context';
import { assets } from '../assets/assets';

const Hero = () => {

  const {axios} = useAppContext()
  const [banners, setBanners] = useState([assets.bigbanner])


  const getBanners =async ()=>{
    const {data} = await axios.get('/banner/get')
    setBanners((prev)=>[prev,...data.banners.map(i=>i.image)])
  }

  useEffect(()=>{
    getBanners()
  },[])

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set up the interval for auto-sliding
    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 2000); // Change image every 3 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [banners.length]); // Re-run effect if banners array changes

  return (
    <div className="relative w-full h-28 md:h-80 mx-auto overflow-hidden">
      {/* Slides container */}
      <div className="flex h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {banners.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-md overflow-hidden" />
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)} className={`w-0.5 h-0.5 md:w-2 md:h-2 rounded-full ${index === currentIndex ? 'bg-[red]' : 'bg-white'}`} aria-label={`Go to slide ${index + 1}`}/>
        ))}
      </div>
    </div>
  );
};


export default Hero
