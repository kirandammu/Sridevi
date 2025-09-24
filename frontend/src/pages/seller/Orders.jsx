import { useEffect, useState } from "react";
import { useAppContext } from "../../context/Context";
import toast from "react-hot-toast";

const Orders = () => {
  
  const [orders, setOrders] = useState([]);
  const { axios } = useAppContext()
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/order/allOrders");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const status =async (event, orderId)=>{
      const response = await axios.post(`/order/status`,{orderId, status:event.target.value})
      if (response.data.success) {
        await fetchOrders()
        toast.success(response.data.message)
      }
    }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-4">
      <div className='flex items-center justify-start gap-2 p-4'>
              <p className='w-8 h-0.5 bg-gray-700'></p>
              <div className='font-semibold text-md uppercase text-[red]'>Orders <span className='text-black'>List</span></div>
              <p className='w-8 h-0.5 bg-[red]'></p>
            </div>
      {orders.map((order, index) =>{
        console.log(order)
        return(
        <div
          key={index}
          className="flex flex-col md:grid md:grid-cols-[2.5fr_1fr_0.5fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
        >
          <div className="flex gap-5">
            <div className="flex flex-col gap-1.5 items-between justify-between">
              {order.items.map((i)=>{
                return (
                  <div className="flex justify-between items-center" key={i.product._id}>
                      <div className="w-12 mr-3"><img src={i.product.images?.[0]} className="w-full "/></div>
                      <div className="flex-1"><p className="font-medium line-clamp-2 flex-1">{i.product.name} <span className={`text-blue-500 ${ i.quantity < 2 && "hidden" }`}>  x {i.quantity}</span></p>
                          <p className="text-xs text-blue-500">{i.product.category}</p>
                      </div>
                  </div>
                )
              })}</div>
            
          </div>

          <div className="text-sm">
            <p className="font-medium mb-1">
              {order.address?.firstName} {order.address?.lastName}
            </p>
            <p>
              {order.address?.street}, {order.address?.city},{" "}
              {order.address?.state},{order.address?.zipcode},{" "}
              {order.address?.country}
            </p>
          </div>

          <p className="font-semibold text-base my-auto text-blue-600">
            ${order.amount}
          </p>
          <div className="text-xs">
              <select className='bg-gray-100 p-2 rounded' onChange={(event)=>status(event,order._id)} value={order?.status}>
                  <option value="Order Processing"> Order Processing</option>
                  <option value="out for delivery"> Out for Delivery</option>
                  <option value="delivered"> Delivered</option>
              </select>
          </div>

          <div className="flex flex-col text-sm">
            <p>Method: <span className={`${order.paymentType === 'Online'?'text-green-600':'text-blue-600'}`}>{order.paymentType}</span></p>
            <p>Date: <span className="text-red-500">{order.createdAt.split('T')[0]}</span></p>
          </div>
        </div>
      )})}
    </div>
  );
};
export default Orders;
