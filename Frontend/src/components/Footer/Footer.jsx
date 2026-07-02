import React from 'react'
import './footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={assets.logo} alt=''/>
                <p>This is just some dummy text where im going to put some slogan about the app or something</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt=''/>
                    <img src={assets.twitter_icon} alt=''/>
                    <img src={assets.linkedin_icon} alt=''/>
                </div>

            </div>
            <div className='footer-content-center'>
                <h2>
                    ABOUT US
                </h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>98437 73404</li>
                    <li>krazyboi2007@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr></hr>
        <p className='footer-copyright'>copyright 2026 tomato.com - All rights reserved.</p>
    </div>
  )
}

export default Footer
