
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://sridevi.onrender.com'

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [seller, setSeller] = useState(false)
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [search, setSearch] = useState("");
  const [categorys, setCategorys] = useState([])
  
  
    const getCategorys =async ()=>{
      const {data} = await axios.get('/category/get')
      setCategorys(data.Categorys)
    }

  
  const fetchUser = async () => {
    setUser(null)
        try {
            // withCredentials is already set on the axios instance
            const { data } = await axios.get("/user/islogin");
            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cart);
                if (data?.user?.role === 'admin') {
                    setSeller(true);
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        }
    };


   const logout = async () => {
     try {
       const {data} = await axios.get('/user/logout')
      if(data.success){
          toast.success(data.message)
          setUser(null)
          setSeller(false)
          navigate('/')
      }
     } catch (error) {
       toast.error(error.message)
     }
    }
 
  // fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/product/all");
      if (data.success) {
        setProducts(data.allProducts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems || {}); // safeguard for undefined

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to cart");
  };

  // update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success(`cart updated`);
  };

  // total cart items
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };
  // total cart amount
  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += cartItems[items] * itemInfo.offerPrice;
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };
  // remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      toast.success(`remove from cart`);
      setCartItems(cartData);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchUser();
    getCategorys()
  }, []);


  // update database cart items
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/user/cart", { cartItems });

        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (user) {
      updateCart();
    }
  }, [cartItems]);

  
  const value = {
    navigate,
    user,
    setUser,
    products,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    search,
    setSearch,
    getCartCount,
    totalCartAmount,
    axios,
    fetchProducts,
    setCartItems,
    logout, 
    seller,
    setSeller,
    categorys, setCategorys, getCategorys
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = ()=>{
    return useContext(AppContext)
}
