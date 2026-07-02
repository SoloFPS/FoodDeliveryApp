import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate()
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext)

    const [menu, setMenu] = useState('home')

    const logout = () => {
        setToken('')
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className='navbar'>
            <Link to='/'>
                <img src={assets.logo} alt='' className='logo' />
            </Link>

            <ul className='navbar-menu'>
                <Link to='/' onClick={() => { setMenu('home') }} className={menu === 'home' ? 'active' : ''}>Home</Link>
                <a href='#explore-menu' onClick={() => { setMenu('menu') }} className={menu === 'menu' ? 'active' : ''}>Menu</a>
                <a href='#app-download' onClick={() => { setMenu('mobile-app') }} className={menu === 'mobile-app' ? 'active' : ''}>Mobile-app</a>
                <a href='#footer' onClick={() => { setMenu('contact-us') }} className={menu === 'contact-us' ? 'active' : ''}>contact us</a>
            </ul>

            <div className='navbar-right'>
                <img src={assets.search_icon} alt='' />
                <div className='navbar-search-icon'>
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt='' />
                        <div className={getTotalCartAmount() ? 'dot' : ''}></div>
                    </Link>
                </div>
                {   
                    !token ? 
                    <button onClick={() => { setShowLogin(true) }}>
                        sign in
                    </button> :
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={() => {navigate('/userorders')}}><img src={assets.bag_icon}></img><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon}></img><p>Logout</p></li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar