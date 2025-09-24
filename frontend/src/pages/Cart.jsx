import { useEffect, useState } from "react";
import {useAppContext} from '../context/Context'
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import Title from "../components/Title";
const Cart = () => {
  const {
    products,
    navigate,
    getCartCount,
    totalCartAmount,
    cartItems,
    setCartItems,
    removeFromCart,
    updateCartItem,
    axios,
    user,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((product) => product._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  const getAddress = async () => {
    try {
      const { data } = await axios.get("/address/get");
      if (data.success) {
        setAddress(data.address);
        if (data.address.length > 0) {
          setSelectedAddress(data.address[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user) {
      getAddress();
    }
  }, [user]);

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  const removeAddress = async (id)=>{
    try {
      const {data} = await axios.post(`/address/remove/${id}`)
      
      if (data.success) {
        toast.success(data.message)
        getAddress()
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{
    removeAddress()
  },[user])

const placeOrder = async () => {
  try {
    if (!selectedAddress) {
      return toast.error("Please select an address");
    }

    switch (paymentOption) {
      case 'COD': {
        const { data } = await axios.post("/order/cod", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({}); // Reset cart
          navigate("/myorder");
        } else {
          toast.error(data.message);
        }
        break;
      }

      case 'Online': {
        const { data } = await axios.post("/order/stripe", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          const { session_url } = data;
          window.location.replace(session_url);
        } else {
          toast.error(data.message);
        }
        break;
      }
      
      default:
        break;
    }
  } catch (error) {
    toast.error(error.message);
  }
};



  return products.length > 0 && (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-2xl font-medium">
          <Title text1={'shopping'} text2={'cart'}/>{" "}
          <span className="text-sm text-red-500">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => {
          return (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(`products/${product.category}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded cusror-pointer"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.images?.[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      value={cartItems[product._id]}
                      className="outline-none"
                    >
                      {Array(
                        cartItems[product._id] > 9 ? cartItems[product._id] : 9
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              ${product.offerPrice * product.quantity}
            </p>
            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <img src={assets.remove_icon} alt="" />
            </button>
          </div>
        )})}

        <button
          onClick={() => navigate("/products")}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-red-500 font-medium"
        >Continue Shopping</button>
      </div>
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />
        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500 text-xs">
              {selectedAddress
                ? ` ${selectedAddress.firstName}_${selectedAddress.lastName}, ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state},${selectedAddress.country}`
                : "No Address Found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-[red] px-2 hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border text-xs border-gray-300 w-full">
                {address.map((address, index) => (
                  <div key={index} onClick={() => { setSelectedAddress(address); setShowAddress(false);}} className="flex justify-between text-gray-500 p-2 hover:bg-gray-200">
                    <p >{address.firstName}_{address.lastName}, {address.street}, {address.city}, {address.state},{" "}
                    {address.country},  </p><img onClick={()=>{removeAddress(address._id)}} src={assets.remove_icon} alt="" className="w-6 border-l pl-2 border-gray-400 cursor-pointer"/>
                  </div>
                ))}
                <p
                  onClick={() => navigate("/address")}
                  className="text-green-700 text-center cursor-pointer p-2 hover:bg-gray-500/30"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>${totalCartAmount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${(totalCartAmount() * 2) / 100}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>${totalCartAmount() + (totalCartAmount() * 2) / 100}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-[red] text-white font-medium hover:bg-gray-900 rounded transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  ) 
};
export default Cart;