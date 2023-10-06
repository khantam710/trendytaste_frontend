import React, { useEffect } from 'react';
import { myOrders } from '../redux/actions/OrderAction';
import { useDispatch, useSelector } from 'react-redux';
import "../css/order.css"

const OrderScreen = () => {
  const { orderInfo, loading, error } = useSelector((state) => state.orders);
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?.data?._id) {
      dispatch(myOrders(userData.data._id));
    }
  }, [dispatch, userData?.data?._id]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log(orderInfo, "orderInfo"); // Check the structure and values of orderInfo array


  return (
    <div className="mt-4 pt-3">
      <h2 className='text-center' style={{color:"rgb(255, 128, 0)"}}>My Orders</h2>
    {orderInfo && orderInfo.length > 0 ? (
      orderInfo.map((val) => (
        <div className="container order" key={val._id}>
          <p>{val.Date}</p>

          <div className="align-item-center row position-relative">
            <div className="col-12 d-flex align-items-center justify-content-between top-0 total-oid">
              <p className='m-2'>Total: ₹{val.orderTotal}</p>
                <p className='small oid'>#{val.orderID}</p>
              </div>
              <div className='col-12 pt-2'>
              {val.userOrder.map(a => (
                <div className='row justify-content-around' key={a._id}>
                  <span className='col-5'>{a.name}</span>
                  <span className='me-4 ms-2 small col-1'>Quantity : {a.quantity}</span>
                  <span className='ms-3 col-1 text-center'>Size : {a.size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No orders found.</p>
    )}
  </div>
  );
};

export default OrderScreen;
