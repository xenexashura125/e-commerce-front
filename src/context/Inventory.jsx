import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'; // Import the uuidv4 function

const createInventoryContext = React.createContext();

export function useInventory() {
    return useContext(createInventoryContext);
}

const InventoryContext = ({ children }) => {
    
    const [cartStatus,setCartStatus] = useState(false);
    const [cartMessage, setCartMessage] = useState("");

    const [listItem,setListItem] = useState([
        {
            id:1,
            img:'./list/m2.png',
            name:"Friend",
            price:22,
            description:"For Handsome Only",
            album:"Honeycomebear",
            genre:"Drama",
            sellers:361,
        },
        {
            id:2,
            img:'./list/m7.png',
            name:"Zenzense",
            price:50,
            description:"Looks cool to be handsome",
            album:"Radwimps",
            genre:"Happiness",
            sellers:116,
        },
        {
            id:3,
            img:'./list/m8.png',
            name:"Your Name",
            price:100,
            description:"Looks cool to be ugly",
            album:"Radwimps",
            genre:"Happiness",
            sellers:55,
        },
        {
            id:4,
            img:'./list/m9.png',
            name:"Sparkle",
            price:33,
            description:"Looks cool to be sexy",
            album:"Radwimps",
            genre:"Happiness",
            sellers:11,
        },
        {
            id:5,
            img:'./list/m1.png',
            name:"Mirror",
            price:22,
            description:"Wasuzerake",
            album:"Honeycomebear",
            genre:"Drama",
            sellers:111,
        },
        {
            id:6,
            img:'./list/m4.png',
            name:"Monochrom Syndrome",
            price:49,
            description:"Pokwang Camera",
            album:"Aimer",
            genre:"Happiness",
            sellers:1999,
        },
        {
            id:7,
            img:'./list/m5.png',
            name:"Sun Dance",
            price:15,
            description:"Filter malala adik",
            album:"Aimer",
            genre:"Happiness",
            sellers:10000,
        },
        {
            id:8,
            img:'./list/m6.png',
            name:"One",
            price:25,
            description:"Want gift",
            album:"Aimer",
            genre:"Chill",
            sellers:5000,
        },
        {
            id:9,
            img:'./list/m3.png',
            name:"Wasuzerake",
            price:30,
            description:"Wala ako nitong phone",
            album:"Honeycomebear",
            genre:"Chill",
            sellers:10000,
        },
    ])
    
    const [carts,setCarts] = useState([])
    
    const [searchQuery,setSearchQuery] = useState("")

    const handleAddToCart = async ( elem,type,user ) => {
        if (user?.email.length > 0) {
            const uuid = uuidv4(); // Generate a UUID using uuidv4
            if (type == "cart") {
                try {
                    const response = await fetch('http://localhost:7777/carts/add-to-cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email:user?.email,
                            shoeVariation:{
                                id: uuid,
                                img: elem.img,
                                name: elem.name,
                                genre: elem.genre,
                                album: elem.album,
                                price: elem.price,
                            }
                        }),
                    });
        
                    const responseData = await response.json();
                    console.log(responseData);
                    setCartMessage("Added to cart successfully")
                    setCartStatus(!cartStatus)
                } catch (error) {
                    console.error('Error adding item to cart:', error);
                }
            } else {
                try {
                    const response = await fetch('http://localhost:7777/carts/add-to-cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email:user?.email,
                            shoeVariation:{
                                id: uuid,
                                img: elem.img,
                                name: elem.name,
                                genre: elem.genre,
                                album: elem.album,
                                price: elem.price,
                            }
                        }),
                    });
                    const responseData = await response.json();
                    setCartMessage("Added to cart successfully")
                    setCartStatus(!cartStatus)
                } catch (error) {
                    console.error('Error adding item to buy:', error);
                }
            }

        } else {
            setCartStatus(!cartStatus)
        }
    };

    

    const value = {
        listItem,setListItem,
        carts,setCarts,
        searchQuery,setSearchQuery,
        handleAddToCart,
        cartStatus,
        setCartStatus,
        cartMessage,
    }

    return (
        <createInventoryContext.Provider value={value}>
            {children}
        </createInventoryContext.Provider>
    )
}

export default InventoryContext