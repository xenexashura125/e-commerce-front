import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import the uuidv4 function
import { useInventory } from '../context/Inventory';
import Navbar from './Navbar';

const Views = ({ user }) => {
    // Get the 'id' parameter from the URL
    const { id } = useParams();
    const { listItem, cartStatus, setCartStatus, handleAddToCart,cartMessage } = useInventory();

    // State to store the item details
    const [item, setItem] = useState(null);

    useEffect(() => {
        // Convert 'id' to a number as it might be a URL parameter and it's best to ensure it's a number.
        const itemId = parseInt(id);
        // Find the item in the 'listItem' array with the matching 'id'
        const selectedItem = listItem.find(item => item.id === itemId);
        // Set the selected item in the state as an object
        setItem(selectedItem || null);
    }, [id, listItem]);

    return (
        <div className='cards-component'>
            { cartStatus && 
                <div className="cart-status">
                    <div className="exit-button" onClick={ e => setCartStatus(false)}>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        </svg>
                    </div>
                    { cartMessage?.length > 0 ? <>
                        <p>
                            {cartMessage}
                        </p>
                    </>  : <> 
                        <Link to={'/login'}>
                            <h5> Please Login First </h5>
                        </Link>
                    </>}
                </div>
            }
            <Navbar/>
            <div className="card-body">
                <div className="img-side">
                    <img src={item?.img} alt="" />
                </div>
                <div className="text-side">
                    <div className="tp">
                        <h2>{item?.name}</h2>
                        <div className="underline"></div>
                        <div className="underline"></div>
                    </div>
                    <div className="tp">
                        <p>Price: ${item?.price}</p>
                        <div className="underline"></div>
                        <div className="underline"></div>

                        <div className="order-stats">
                            <p onClick={e => handleAddToCart(item,"buy",user)}> Buy </p>
                            <p  onClick={e => handleAddToCart(item,"cart",user)}> Cart </p>
                        </div>
                    </div>
                    <div className="tp">
                        <p>Description</p>
                        <div className="underline"></div>
                        <p> {item?.description} </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Views;
