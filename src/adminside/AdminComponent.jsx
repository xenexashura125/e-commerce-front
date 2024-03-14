import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import Accounts from './Accounts';

const AdminComponent = () => {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [views, setViews] = useState([]);
    const [totalViews, setTotalViews] = useState(0); // State for total views
    const [statistics,setStatistics] = useState([]);
    const [totalSellerCounts, setTotalSellerCounts] = useState(0); // State for total seller counts
    const [showAccount,setShowAccounts] = useState(false)
    const [showDash,setShowDashboard] = useState(true)

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:7777/auth/get-all-users');
                if (response.ok) {
                    const data = await response.json();
                    // Step 3: Update the state variable with user accounts data
                    setUsers(data.users);
                } else {
                    console.error('Failed to fetch user accounts');
                }
            } catch (error) {
                console.error('Error fetching user accounts:', error);
            }
        }
        async function fetchOrders() {
            try {
                const response = await fetch('http://localhost:7777/orders/get-all-orders');
                if (response.ok) {
                    const data = await response.json();
                    // Step 3: Update the state variable with user accounts data
                    setOrders(data.orders);

                    // Calculate total seller counts from orders
                    const totalSellerCounts = data.orders.reduce(
                        (total, order) => total + order.sellerCount,
                        0
                    );
                    setTotalSellerCounts(totalSellerCounts);

                } else {
                    console.error('Failed to fetch user accounts');
                }
            } catch (error) {
                console.error('Error fetching user accounts:', error);
            }
        }
        async function fetchViews() {
            try {
                const response = await fetch('http://localhost:7777/views/get-all-views');
                if (response.ok) {
                    const data = await response.json();
                    // Update the state variable with views data
                    setViews(data.views);
                    const totalViews = data.views.reduce((total, itemView) => total + itemView.viewCount, 0);
                    setTotalViews(totalViews);
                } else {
                    console.error('Failed to fetch item views');
                }
            } catch (error) {
                console.error('Error fetching item views:', error);
            }
        }
        fetchViews();
        fetchOrders();
        fetchUsers();
    }, []); // Run this effect only once on component mount


    const animateBarBodies = () => {
        const tl = gsap.timeline();


        // Animation configuration for each bar-body
        const animations = [
        { target: '.acc', duration: 3.5, delay: 0.5, height:`${users.length * 20}px` },
        { target: '.ord', duration: 3.5, delay: 1, height:`${totalSellerCounts * 20}px` },
        { target: '.view', duration: 3.5, delay: 1.5, height:`${totalViews * 20}px` },
        ];

        // Animate each bar-body
        animations.forEach((animation) => {
            tl.fromTo(animation.target,{
                height:"0px",
                scaleY:0,
            },{
                scaleY:1,
                ease:"sin.inOut",
                duration:animation.duration,
                delay: animation.delay,
                height:animation.height
            },0);
        });

        return tl;
    };

    // Run the animation on component mount
    useEffect(() => {
        animateBarBodies();
    }, [users,totalSellerCounts,totalViews]);

    const showAccountsItem = () => {
        setShowAccounts(true);
        setShowDashboard(false);
    }

    const showDashboard = () => {
        setShowDashboard(true);
        setShowAccounts(false);
    }

    return (
        <div className='admin-component'>
            <div className='navbar-components'>
                <nav>
                    <ul>
                        <div className={`nav-compo nav-links`}>
                            <li>
                                <p className="link-item" onClick={showDashboard}>
                                    Dashboard
                                </p>
                            </li>
                            <li>
                                <p className="link-item" onClick={showAccountsItem}>
                                    Accounts
                                </p>
                            </li>
                        </div>
                    </ul>   
                </nav>
            </div>
            { showAccount && <Accounts users={users} /> }
            { showDash && 
                <div className="dashboard-component">
                    <div className="dash-subcomponent">
                        <div className="show-data">
                            <div className="data">
                                <div className="field-data">
                                    <h5> Accounts </h5>
                                    <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 13.0001V15.0001H0V13.0001C0 13.0001 0 9.00005 7 9.00005C14 9.00005 14 13.0001 14 13.0001ZM10.5 3.50005C10.5 2.80782 10.2947 2.13113 9.91014 1.55556C9.52556 0.979985 8.97893 0.531381 8.33939 0.266474C7.69985 0.00156766 6.99612 -0.067744 6.31718 0.0673043C5.63825 0.202353 5.01461 0.535695 4.52513 1.02518C4.03564 1.51466 3.7023 2.1383 3.56725 2.81724C3.4322 3.49617 3.50152 4.1999 3.76642 4.83944C4.03133 5.47899 4.47993 6.02561 5.0555 6.4102C5.63108 6.79478 6.30777 7.00005 7 7.00005C7.92826 7.00005 8.8185 6.6313 9.47487 5.97493C10.1313 5.31855 10.5 4.42831 10.5 3.50005ZM13.94 9.00005C14.5547 9.4758 15.0578 10.0805 15.4137 10.7716C15.7696 11.4626 15.9697 12.2233 16 13.0001V15.0001H20V13.0001C20 13.0001 20 9.37005 13.94 9.00005ZM13 5.2579e-05C12.3117 -0.00378014 11.6385 0.202008 11.07 0.590053C11.6774 1.43879 12.0041 2.45634 12.0041 3.50005C12.0041 4.54377 11.6774 5.56132 11.07 6.41005C11.6385 6.7981 12.3117 7.00389 13 7.00005C13.9283 7.00005 14.8185 6.6313 15.4749 5.97493C16.1313 5.31855 16.5 4.42831 16.5 3.50005C16.5 2.57179 16.1313 1.68156 15.4749 1.02518C14.8185 0.368802 13.9283 5.2579e-05 13 5.2579e-05Z" fill="#fff"/>
                                    </svg>
                                    <h5> {users.length} </h5>
                                </div>
                                <div className="under-line"></div>
                            </div>
                            <div className="data">
                                <div className="field-data">
                                    <h5> Orders </h5>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6867 3.825 17.9743 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31267 6.1 0.788C7.31667 0.263333 8.61667 0.000666667 10 0C11.3833 0 12.6833 0.262667 13.9 0.788C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18ZM6 13V11.35C6 11.2167 6.025 11.0873 6.075 10.962C6.125 10.8367 6.2 10.7243 6.3 10.625L11.525 5.425C11.675 5.275 11.8417 5.16667 12.025 5.1C12.2083 5.03333 12.3917 5 12.575 5C12.775 5 12.9667 5.03767 13.15 5.113C13.3333 5.18833 13.5 5.30067 13.65 5.45L14.575 6.375C14.7083 6.525 14.8127 6.69167 14.888 6.875C14.9633 7.05833 15.0007 7.24167 15 7.425C15 7.60833 14.9667 7.796 14.9 7.988C14.8333 8.18 14.725 8.35067 14.575 8.5L9.375 13.7C9.275 13.8 9.16233 13.875 9.037 13.925C8.91167 13.975 8.78267 14 8.65 14H7C6.71667 14 6.479 13.904 6.287 13.712C6.095 13.52 5.99933 13.2827 6 13ZM12.575 8.4L13.5 7.425L12.575 6.5L11.625 7.45L12.575 8.4Z" fill="#fff"/>
                                    </svg>
                                    <h5>{totalSellerCounts}</h5>
                                </div>
                                <div className="under-line"></div>
                            </div>
                            <div className="data">
                                <div className="field-data">
                                    <h5> All Views </h5>
                                    <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M29.9396 10.66C28.7634 7.61765 26.7216 4.98662 24.0664 3.09209C21.4112 1.19756 18.2591 0.122573 14.9996 0C11.7401 0.122573 8.58796 1.19756 5.93278 3.09209C3.27759 4.98662 1.23574 7.61765 0.0595746 10.66C-0.0198582 10.8797 -0.0198582 11.1203 0.0595746 11.34C1.23574 14.3824 3.27759 17.0134 5.93278 18.9079C8.58796 20.8024 11.7401 21.8774 14.9996 22C18.2591 21.8774 21.4112 20.8024 24.0664 18.9079C26.7216 17.0134 28.7634 14.3824 29.9396 11.34C30.019 11.1203 30.019 10.8797 29.9396 10.66ZM14.9996 20C9.69957 20 4.09957 16.07 2.06957 11C4.09957 5.93 9.69957 2 14.9996 2C20.2996 2 25.8996 5.93 27.9296 11C25.8996 16.07 20.2996 20 14.9996 20Z" fill="#fff"/>
                                    <path d="M15 5C13.8133 5 12.6533 5.35189 11.6666 6.01118C10.6799 6.67047 9.91085 7.60754 9.45673 8.7039C9.0026 9.80026 8.88378 11.0067 9.11529 12.1705C9.3468 13.3344 9.91825 14.4035 10.7574 15.2426C11.5965 16.0818 12.6656 16.6532 13.8295 16.8847C14.9933 17.1162 16.1997 16.9974 17.2961 16.5433C18.3925 16.0892 19.3295 15.3201 19.9888 14.3334C20.6481 13.3467 21 12.1867 21 11C21 9.4087 20.3679 7.88258 19.2426 6.75736C18.1174 5.63214 16.5913 5 15 5ZM15 15C14.2089 15 13.4355 14.7654 12.7777 14.3259C12.1199 13.8864 11.6072 13.2616 11.3045 12.5307C11.0017 11.7998 10.9225 10.9956 11.0769 10.2196C11.2312 9.44371 11.6122 8.73098 12.1716 8.17157C12.731 7.61216 13.4437 7.2312 14.2196 7.07686C14.9956 6.92252 15.7998 7.00173 16.5307 7.30448C17.2616 7.60723 17.8864 8.11992 18.3259 8.77772C18.7654 9.43552 19 10.2089 19 11C19 12.0609 18.5786 13.0783 17.8284 13.8284C17.0783 14.5786 16.0609 15 15 15Z" fill="#fff"/>
                                    </svg>
                                    <h5>{totalViews}</h5>
                                </div>
                                <div className="under-line"></div>
                            </div>
                        </div>
                        <div className="daily-orders">
                            <h5> Statistics </h5>
                            <div className="bar-chart">
                                <div className="bar-body-chart">
                                    <div className="bar-body acc">
                                        <div className="text"> Accounts </div>
                                        <div className="box"></div>
                                    </div>
                                    <div className="bar-body ord">
                                        <div className="text"> Orders </div>
                                        <div className="box ord"></div>
                                    </div>
                                    <div className="bar-body view">
                                        <div className="text"> Views </div>
                                        <div className="box"></div>
                                    </div>
                                </div>
                                <div className="range-high">
                                    <div className="line">
                                        <h5> 10000 </h5>
                                        <div className="under_line"></div>
                                    </div>
                                    <div className="line">
                                        <h5> 5000 </h5>
                                        <div className="under_line"></div>
                                    </div>
                                    <div className="line">
                                        <h5> 2500 </h5>
                                        <div className="under_line"></div>
                                    </div>
                                    <div className="line">
                                        <h5> 100 </h5>
                                        <div className="under_line"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AdminComponent