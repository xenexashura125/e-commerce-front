import React, { useEffect, useRef, useState } from 'react'
import { useInventory } from '../context/Inventory';
import { v4 as uuidv4 } from 'uuid'; // Import the uuidv4 function
import { useAccount } from '../context/AccountContext';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Carters from './Carters';
import { useViews } from '../context/ViewsContext';
const Shops = ({ user }) => {
    const refSliders = useRef([])

    const { searchQuery, listItem, setSearchQuery, handleAddToCart, cartStatus, setCartStatus } = useInventory()
    const [showcarts,setShowCarts] = useState(false)
    const { updateItemViews } = useViews()

    const [filteredItems, setFilteredItems] = useState([]);

    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [isSellerOpen, setIsSellerOpen] = useState(false);  

    // Maintain separate state variables for each filter
    const [brandFilter, setBrandFilter] = useState("");
    const [modelFilter, setModelFilter] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [selectedSellerRange, setSelectedSellerRange] = useState(null);

    const handleSearchChange = (event) => {
        setSearchFilter(event.target.value);
    };

    const toggleBrandDropdown = () => {
        setIsBrandOpen(!isBrandOpen);
    };

    const toggleModelDropdown = () => {
        setIsModelOpen(!isModelOpen);
    };
    
    const togglePriceDropdown = () => {
        setIsPriceOpen(!isPriceOpen);
    }

    const toggleBestSellerDropdown = () => {
        setIsSellerOpen(!isSellerOpen);
    }

    // Function to apply the price range filter
    const handlePriceFilterClick = (priceRange) => {
        setSelectedPriceRange(priceRange);
    };

    // Function to apply the best seller filter
    const handleBestSellerFilterClick = (sellerRange) => {
        setSelectedSellerRange(sellerRange);
    };

    const handleBrandFilterClick = (brand) => {
        // Reset all other filters
        setSearchFilter("");
        setModelFilter("");
        setSelectedPriceRange(null);
        setSelectedSellerRange(null);
    
        // Apply the brand filter
        setBrandFilter(brand);
    };
    
    const handleModelFilterClick = (model) => {
        // Reset all other filters
        setSearchFilter("");
        setBrandFilter("");
        setSelectedPriceRange(null);
        setSelectedSellerRange(null);
    
        // Apply the model filter
        setModelFilter(model);
    };
    
    useEffect(() => {
        // Filter items based on all filters
        const filtered = listItem.filter((item) => 
            (searchFilter === '' || 
              item.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
              item.genre.toLowerCase().includes(searchFilter.toLowerCase()) || 
              item.album.toLowerCase().includes(searchFilter.toLowerCase()) 

            
            )
        );
    
        setFilteredItems(filtered);
    }, [searchFilter, listItem]);
    

    return (
        <>
        { cartStatus &&
            <div className="cart-status">
                <div className="exit-button" onClick={ e => setCartStatus(false)}>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 0.499875C11.0001 0.776017 10.7763 0.999931 10.5001 1L2.50045 1.002C2.50041 1.002 2.5005 1.002 2.50045 1.002C1.67189 1.00282 1 1.6746 1 2.502V12.497C1 12.8948 1.15804 13.2764 1.43934 13.5577C1.72064 13.839 2.10218 13.997 2.5 13.997H10.595C10.8711 13.997 11.095 14.2209 11.095 14.497C11.095 14.7731 10.8711 14.997 10.595 14.997H2.5C1.83696 14.997 1.20107 14.7336 0.732233 14.2648C0.263392 13.7959 0 13.16 0 12.497V2.502C0 1.12144 1.12017 0.00324972 2.49955 0.00200029L10.4999 1.59747e-08C10.776 -6.9036e-05 10.9999 0.223733 11 0.499875ZM10.2472 4.1408C10.4456 3.94871 10.7621 3.9538 10.9542 4.15218L13.8592 7.15218C14.0469 7.34606 14.0469 7.65394 13.8592 7.84782L10.9542 10.8478C10.7621 11.0462 10.4456 11.0513 10.2472 10.8592C10.0488 10.6671 10.0437 10.3506 10.2358 10.1522L12.3198 8H4.5C4.22386 8 4 7.77614 4 7.5C4 7.22386 4.22386 7 4.5 7H12.3198L10.2358 4.84782C10.0437 4.64944 10.0488 4.3329 10.2472 4.1408Z" fill="black"/>
                    </svg>
                </div>
                <Link to={'/login'}>
                    <h5> Please Login First </h5>
                </Link>
            </div>
        }
        <Navbar user={user} setShowCarts={setShowCarts} showcarts={showcarts}/>        
        <Carters  user={user} setShowCarts={setShowCarts} showcarts={showcarts}/>
        <div className='shops-component'>
            <div className="search-bar">
                <input 
                    type="text" 
                    name='searchitem'
                    value={searchFilter} 
                    onChange={handleSearchChange} 
                    placeholder='Search...' 
                />

            </div>
            <div className='products-component'>
                <div className="product-subcomponent">
                    <div className="product-body">
                        {filteredItems.map((elem,i) => {
                            return(
                                <div className="item-show" key={i}>
                                    <div className="title">
                                        <h4>{elem.name}</h4>
                                    </div>
                                    <div className="item-body"><img src={elem.img} alt="" /></div>
                                    <div className="item-details">
                                        <div className="d1">
                                            <button className="add-to-cart" onClick={e => handleAddToCart(elem,"cart",user)}>
                                                Cart
                                            </button>
                                            <h5 className="price">
                                                {elem.price}$
                                            </h5>
                                        </div>
                                        <div className="d2">
                                            <h4>
                                                Genre || {elem.genre} <br/>
                                                <br/>
                                                Album || {elem.album} <br/>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="new-mark" onClick={() => updateItemViews(elem.album, elem.genre)}>
                                        <h5> View </h5>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Shops