import React from 'react'
import './orders.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets.js'

const Order = () => {

  const url = import.meta.env.VITE_API_URL

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    const response = await axios.get(url + '/api/order/listorders')
    if (response.data.success) {
      setOrders(response.data.orders)
    }

    else {
      toast.error('Error')
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + '/api/order/status', {
      orderId,
      status: event.target.value
    })

    if(response.data.success)
    {
      await fetchOrders()
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {
          orders.map((order, index) => {
            return(
              <div className="order-item" key={index}>
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className='order-item-food'>
                    {
                      order.items.map((item, index) => {
                        if(order.items.length - 1 === index)
                        {
                          return item.name + ' x ' + item.quantity
                        }
                        else
                        {
                          return item.name + ' x ' + item.quantity + ' , '
                        }
                      })
                    }
                  </p>
                  <p className="order-item-name">{ order.firstname + ' ' + order.lastname}</p>
                  <div className='order-item-address'>
                    <p>{order.address}</p>
                  </div>
                  <p className="order-item-phone">
                    {order.phone}
                  </p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>${order.amount}</p>
                <select onChange={(event)=>statusHandler(event, order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Order
