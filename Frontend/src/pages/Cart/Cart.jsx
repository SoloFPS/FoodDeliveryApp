

import './cart.css'

import { useContext } from 'react'

import { StoreContext } from '../../Context/StoreContext.jsx'

import { useNavigate } from 'react-router-dom'



const Cart = () => {

  const navigate = useNavigate()

  const { addToCart, removeFromCart, cartItems, food_list, getTotalCartAmount, url } = useContext(StoreContext)

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {
          food_list.map((item, index) => {


            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div class='cart-items-title cart-items-item'>
                    <img src={url + '/images/' +item.image} alt=''></img>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${cartItems[item._id] * item.price}</p>
                    <p onClick={() => { removeFromCart(item._id) }} className='cross'>X</p>
                  </div>
                  <hr />
                </div>

              )

            }


          })
        }

      </div>

      <div className="cart-bottom">
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

          <button onClick={() => { navigate('/order') }}>PROCEED TO CHECKOUT</button>
        </div>

        <div className='cart-promocode'>
          <div>
            <p>
              If you have a promo code please enter it here
            </p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit code</button>
            </div>

          </div>
        </div>
      </div>


    </div>
  )
}

export default Cart
