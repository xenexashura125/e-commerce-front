import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAccount } from '../context/AccountContext';

const Navbar = ({ user,showcarts,setShowCarts }) => {

    const { logout } = useAccount()

    const [show,setShow] = useState(false)
    const [showProfile,setShowProfile] = useState(false)

    const handleShow = () => {
        setShow(!show)
        setShowProfile(false)
    }
    
    const handleShowProfile = () => {
        setShow(false)
        setShowProfile(!showProfile)
    }

    return (
        <div className='navbar-components'>
            <nav>
                <ul>
                    <div className={`nav-compo nav-links ${show ? 'show-links' : ''}`}>
                        <li>
                            <Link className="link-item" to={'/'}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className="link-item" to={'/shop'}>
                                Albums / Music
                            </Link>
                        </li>
                        {/* <li>
                            <Link className="link-item" to={'/category'}>
                                Category
                            </Link>
                        </li> */}
                    </div>
                    <div className="ham-button" onClick={handleShow}>
                        {
                            show ? 
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.711216 0.710972C0.798302 0.623666 0.901756 0.554398 1.01565 0.507136C1.12955 0.459874 1.25165 0.435547 1.37497 0.435547C1.49828 0.435547 1.62038 0.459874 1.73428 0.507136C1.84818 0.554398 1.95163 0.623666 2.03872 0.710972L6.99997 5.6741L11.9612 0.710972C12.0484 0.623807 12.1519 0.554664 12.2657 0.507491C12.3796 0.460318 12.5017 0.436038 12.625 0.436038C12.7482 0.436038 12.8703 0.460318 12.9842 0.507491C13.0981 0.554664 13.2016 0.623807 13.2887 0.710972C13.3759 0.798137 13.445 0.901617 13.4922 1.0155C13.5394 1.12939 13.5637 1.25145 13.5637 1.37472C13.5637 1.49799 13.5394 1.62006 13.4922 1.73394C13.445 1.84783 13.3759 1.95131 13.2887 2.03847L8.32559 6.99972L13.2887 11.961C13.3759 12.0481 13.445 12.1516 13.4922 12.2655C13.5394 12.3794 13.5637 12.5015 13.5637 12.6247C13.5637 12.748 13.5394 12.8701 13.4922 12.9839C13.445 13.0978 13.3759 13.2013 13.2887 13.2885C13.2016 13.3756 13.0981 13.4448 12.9842 13.492C12.8703 13.5391 12.7482 13.5634 12.625 13.5634C12.5017 13.5634 12.3796 13.5391 12.2657 13.492C12.1519 13.4448 12.0484 13.3756 11.9612 13.2885L6.99997 8.32535L2.03872 13.2885C1.95155 13.3756 1.84807 13.4448 1.73419 13.492C1.6203 13.5391 1.49824 13.5634 1.37497 13.5634C1.2517 13.5634 1.12963 13.5391 1.01575 13.492C0.901861 13.4448 0.798381 13.3756 0.711216 13.2885C0.624051 13.2013 0.554908 13.0978 0.507735 12.9839C0.460562 12.8701 0.436282 12.748 0.436282 12.6247C0.436282 12.5015 0.460562 12.3794 0.507735 12.2655C0.554908 12.1516 0.624051 12.0481 0.711216 11.961L5.67434 6.99972L0.711216 2.03847C0.62391 1.95139 0.554642 1.84793 0.50738 1.73404C0.460118 1.62014 0.435791 1.49804 0.435791 1.37472C0.435791 1.25141 0.460118 1.12931 0.50738 1.01541C0.554642 0.901512 0.62391 0.798058 0.711216 0.710972Z" fill="black"/>
                            </svg>
                            : 
                            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 1C0 0.447715 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1C24 1.55228 23.5523 2 23 2H1C0.447715 2 0 1.55228 0 1ZM0 9C0 8.44772 0.447715 8 1 8H23C23.5523 8 24 8.44772 24 9C24 9.55229 23.5523 10 23 10H1C0.447715 10 0 9.55229 0 9ZM0 17C0 16.4477 0.447715 16 1 16H23C23.5523 16 24 16.4477 24 17C24 17.5523 23.5523 18 23 18H1C0.447715 18 0 17.5523 0 17Z" fill="black"/>
                            </svg>
                        }
                    </div>
                    <div className="user-login" onClick={handleShowProfile}>
                        <h4>
                            {user?.displayName }
                        </h4>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" 
                            onClick={e => setShowCarts(!showcarts)} 
                            className='carts-show'>
                            <path d="M15 5H12V4C12 2.93913 11.5786 1.92172 10.8284 1.17157C10.0783 0.421427 9.06087 0 8 0C6.93913 0 5.92172 0.421427 5.17157 1.17157C4.42143 1.92172 4 2.93913 4 4V5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V6C16 5.73478 15.8946 5.48043 15.7071 5.29289C15.5196 5.10536 15.2652 5 15 5ZM6 4C6 3.46957 6.21071 2.96086 6.58579 2.58579C6.96086 2.21071 7.46957 2 8 2C8.53043 2 9.03914 2.21071 9.41421 2.58579C9.78929 2.96086 10 3.46957 10 4V5H6V4ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V7H4V8C4 8.26522 4.10536 8.51957 4.29289 8.70711C4.48043 8.89464 4.73478 9 5 9C5.26522 9 5.51957 8.89464 5.70711 8.70711C5.89464 8.51957 6 8.26522 6 8V7H10V8C10 8.26522 10.1054 8.51957 10.2929 8.70711C10.4804 8.89464 10.7348 9 11 9C11.2652 9 11.5196 8.89464 11.7071 8.70711C11.8946 8.51957 12 8.26522 12 8V7H14V17Z" fill="black"/>
                        </svg>
                        {user?.displayName ? 
                            <div className="show-profile">
                                <div className="prof-item" onClick={logout}>
                                    <h5> Logout </h5>
                                </div>  
                            </div>
                        : <>
                            <div className="show-profile">
                                <Link className="prof-item" to={'/login'}>
                                    <h5> Login </h5>
                                </Link>  
                            </div>
                        </>}
                    </div>
                </ul>   
            </nav>
        </div>
    )
}

export default Navbar