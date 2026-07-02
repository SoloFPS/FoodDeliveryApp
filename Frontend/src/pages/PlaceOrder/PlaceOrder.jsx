import React, { useEffect } from 'react'
import { useState } from 'react'
import './placeorder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


const PlaceOrder = () => {

  const navigate = useNavigate()


  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData({ ...data, [name]: value })
  }

  const { getTotalCartAmount, url, token, food_list, cartItems, setCartItems } = useContext(StoreContext)

  useEffect(() => {
    if(!token)
    {
      navigate('/cart')
    }

    else if(getTotalCartAmount() === 0)
    {
      navigate('/cart')
    }
  }, [token])

  const placeOrderHandler = async (e) => {
    e.preventDefault()

    let items = []
    food_list.map((item) => {
      {
        if (cartItems[item._id] > 0) {
          let foodInfo = item
          foodInfo['quantity'] = cartItems[item._id]
          items.push(foodInfo)
        }
      }
    })

    const response = await axios.post(url + '/api/order/place', {
      amount: getTotalCartAmount() + 2,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    }, { headers: { Authorization: `Bearer ${token}` } })

    if (!response.data.success) {
      console.log('unable to place order an error has occured')
      return
    }
    console.log(response)

    const { order } = response.data
    var options = {
      "key": import.meta.env.VITE_TEST_API_KEY,
      "amount": order.amount,
      "currency": order.currency,
      "name": "Prithvi food app :)",
      "description": "Ordering food",
      "order_id": order.id,
      "handler": async function (response) {
        const body = {
          ...response, address: `${data.street}, ${data.city}, ${data.state} ${data.zipcode}, ${data.country}`,
          amount: getTotalCartAmount() + 2,
          items,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phone: Number(data.phone)
        }
        const validRes = await axios.post(url + '/api/order/validate', body, { headers: { Authorization: `Bearer ${token}` } })
        console.log(validRes)
        console.log(validRes.data.success)
        if(validRes.data.success)
        {
          setCartItems({});
          navigate('/userorders')
        }
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var checkout = new window.Razorpay(options);
    checkout.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    checkout.open();

  }

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input type="text" name='firstname' value={data.firstname} onChange={onChangeHandler} placeholder='First name' />
          <input type="text" name='lastname' value={data.lastname} onChange={onChangeHandler} placeholder='Last name' />
        </div>
        <input type="email" name='email' value={data.email} onChange={onChangeHandler} placeholder='Email address' />
        <input type="text" name='street' value={data.street} onChange={onChangeHandler} placeholder='Street' required/>
        <div className="multi-fields">
          <input type="text" name='city' value={data.city} onChange={onChangeHandler} placeholder='City' required/>
          <input type="text" name='state' value={data.state} onChange={onChangeHandler} placeholder='State' required/>
        </div>
        <div className="multi-fields">
          <input type="text" name='zipcode' value={data.zipcode} onChange={onChangeHandler} placeholder='Zipcode' required/>
          <input type="text" name='country' value={data.country} onChange={onChangeHandler} placeholder='Country' required/>
        </div>
        <input type="text" name='phone' value={data.phone} onChange={onChangeHandler} placeholder='Phone' required/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>
            Cart Totals
          </h2>
          <div>
            <div className="cart-total-details">
              <p>
                Subtotal
              </p>
              <p>
                ${getTotalCartAmount()}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${(getTotalCartAmount() > 0) ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${(getTotalCartAmount() > 0) ? getTotalCartAmount() + 2 : 0}</p>
            </div>

          </div>

          <button onClick={placeOrderHandler}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
