import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Checkout = ({ user }) => {

    const [showcarts, setShowCarts] = useState(false);
    const [cart, setCart] = useState(null);
    const [checkedItems, setCheckedItems] = useState([]);
  
    const [checkout,setCheckOut] = useState(false)

    const handleCheckOut = () => {
        setCheckOut(true);
    }

    const handleExitCheck = () => { 
        setCheckOut(false);
    }

    const handleYesCheckout = async () => {
        try {
            // Get the IDs of checked items to remove
            const itemsToRemove = cart?.shoeVariations
                .filter((item, index) => checkedItems[index]) // Fix 'i' to 'index' here
                .map((item) => item.id);
            
            console.log(itemsToRemove)

            // Send a request to remove checked items from the cart
            const response = await fetch(`http://localhost:7777/carts/cart/${user.email}/remove-checked-items`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemsToRemove }),
            });
            
            if (response.ok) {
                // Update the cart state to reflect the removed items
                const updatedCart = { ...cart };
                updatedCart.shoeVariations = updatedCart.shoeVariations.filter((item, index) => !checkedItems[index]); // Fix 'i' to 'index' here
                setCart(updatedCart);
                
                // Clear the checkedItems state
                setCheckedItems(new Array(updatedCart.shoeVariations.length).fill(false));
                
                // Exit the checkout mode
                setCheckOut(false);
            } else {
                console.error('Failed to remove checked items from cart');
            }
        } catch (error) {
            console.error('Error removing checked items from cart:', error);
        }
    }
    
    
    
    const handleNoCheckout = () => { 
        setCheckOut(false);
    }

    useEffect(() => {
        const getCarts = async () => {
            try {
            const carts = await fetch(`http://localhost:7777/carts/cart/${user.email}`, {
                method: 'GET',
                headers: {
                "Content-Type": "application/json"
                }
            });
            const data = await carts.json();
            console.log(data);
    
                // Initialize the checkedItems array with the same length as the cart
            setCheckedItems(new Array(data.cart.shoeVariations.length).fill(false));
    
                // Update the cart state with the retrieved cart data
                setCart(data.cart);
            } catch (error) {
            console.error('Error fetching user carts:', error);
            }
        }
        getCarts();
    }, [user]);
  
    const handleDeleteCart = async (itemId) => {
        try {
            // Send a request to delete the item from the cart
            const response = await fetch(`http://localhost:7777/carts/cart/${user.email}/remove-item/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const updatedCart = { ...cart };
                const deletedItem = updatedCart.shoeVariations.find((item) => item.id === itemId);
    
                if (deletedItem) {
                    updatedCart.totalPrice -= deletedItem.price;
                    updatedCart.shoeVariations = updatedCart.shoeVariations.filter((item) => item.id !== itemId);
                    setCart(updatedCart);
                }
            } else {
                console.error('Failed to delete item from cart');
            }
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    }
    
  
    // Function to calculate the subtotal
    const calculateSubtotal = () => {
        let subtotal = 0;
        cart?.shoeVariations.forEach((elem, i) => {
            if (checkedItems[i]) {
            subtotal += elem.price;
            }
        });
        return subtotal;
    }
  
    // Function to toggle the checkmark for an item
    const toggleCheckmark = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);
    }



    return (
        <div className='home-component'>
            <Navbar user={user} showcarts={showcarts} setShowCarts={setShowCarts} />
            {checkout ? 
            <div className="checkout-bar">
                <div className="checkout-items">
                    <div className="svg-exit" onClick={handleExitCheck}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.711216 0.710972C0.798302 0.623666 0.901756 0.554398 1.01565 0.507136C1.12955 0.459874 1.25165 0.435547 1.37497 0.435547C1.49828 0.435547 1.62038 0.459874 1.73428 0.507136C1.84818 0.554398 1.95163 0.623666 2.03872 0.710972L6.99997 5.6741L11.9612 0.710972C12.0484 0.623807 12.1519 0.554664 12.2657 0.507491C12.3796 0.460318 12.5017 0.436038 12.625 0.436038C12.7482 0.436038 12.8703 0.460318 12.9842 0.507491C13.0981 0.554664 13.2016 0.623807 13.2887 0.710972C13.3759 0.798137 13.445 0.901617 13.4922 1.0155C13.5394 1.12939 13.5637 1.25145 13.5637 1.37472C13.5637 1.49799 13.5394 1.62006 13.4922 1.73394C13.445 1.84783 13.3759 1.95131 13.2887 2.03847L8.32559 6.99972L13.2887 11.961C13.3759 12.0481 13.445 12.1516 13.4922 12.2655C13.5394 12.3794 13.5637 12.5015 13.5637 12.6247C13.5637 12.748 13.5394 12.8701 13.4922 12.9839C13.445 13.0978 13.3759 13.2013 13.2887 13.2885C13.2016 13.3756 13.0981 13.4448 12.9842 13.492C12.8703 13.5391 12.7482 13.5634 12.625 13.5634C12.5017 13.5634 12.3796 13.5391 12.2657 13.492C12.1519 13.4448 12.0484 13.3756 11.9612 13.2885L6.99997 8.32535L2.03872 13.2885C1.95155 13.3756 1.84807 13.4448 1.73419 13.492C1.6203 13.5391 1.49824 13.5634 1.37497 13.5634C1.2517 13.5634 1.12963 13.5391 1.01575 13.492C0.901861 13.4448 0.798381 13.3756 0.711216 13.2885C0.624051 13.2013 0.554908 13.0978 0.507735 12.9839C0.460562 12.8701 0.436282 12.748 0.436282 12.6247C0.436282 12.5015 0.460562 12.3794 0.507735 12.2655C0.554908 12.1516 0.624051 12.0481 0.711216 11.961L5.67434 6.99972L0.711216 2.03847C0.62391 1.95139 0.554642 1.84793 0.50738 1.73404C0.460118 1.62014 0.435791 1.49804 0.435791 1.37472C0.435791 1.25141 0.460118 1.12931 0.50738 1.01541C0.554642 0.901512 0.62391 0.798058 0.711216 0.710972Z" fill="white"/>
                        </svg>
                    </div>
                    <h5> Are you sure you want to buy these? </h5>
                    <div className="option-check">
                        <button className="yes" onClick={handleYesCheckout}>
                            Yes
                        </button>
                        <button className="no" onClick={handleNoCheckout}>
                            No
                        </button>
                    </div>
                </div>
            </div>
            : <></>}
            <div className="center-comp">
                <div className="shopping-component">
                    <div className="item-check-section">
                        <div className="prices">
                            <h4>Subtotal: ${calculateSubtotal()}</h4>
                        </div>
                        <button className="check-out-item" onClick={handleCheckOut}>
                            <h4>
                                Check Out Items
                            </h4>
                        </button>
                    </div>
                    <div className="shopping-cart-list">
                        {cart?.shoeVariations.map((elem, i) => {
                        return (
                            <div className="link-item" key={i}>
                                <div className="checkmark" onClick={() => toggleCheckmark(i)}>
                                    {checkedItems[i] ? "✓" : ""}
                                </div>
                                <div className="img-side">
                                    <img src={elem.img} alt="" />
                                </div>
                                <div className="t1-text">
                                    <h5> {elem.name} </h5>
                                    <h5> Price || ${elem.price} </h5>
                                    <h5> Genre || {elem.genre} </h5>
                                    <h5> Album || {elem.album} </h5>
                                </div>
                                <div className="delete-button" onClick={() => handleDeleteCart(elem.id)}>
                                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 23.25C3.0625 23.25 2.47375 23.005 1.98375 22.515C1.49375 22.025 1.24917 21.4367 1.25 20.75V4.5H0V2H6.25V0.75H13.75V2H20V4.5H18.75V20.75C18.75 21.4375 18.505 22.0263 18.015 22.5163C17.525 23.0063 16.9367 23.2508 16.25 23.25H3.75ZM16.25 4.5H3.75V20.75H16.25V4.5ZM6.25 18.25H8.75V7H6.25V18.25ZM11.25 18.25H13.75V7H11.25V18.25Z" fill="white"/>
                                    </svg>
                                </div>
                            </div>
                        )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;
