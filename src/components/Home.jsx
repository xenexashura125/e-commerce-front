import React, { useEffect, useRef, useState } from 'react'
import { useInventory } from '../context/Inventory';
import { v4 as uuidv4 } from 'uuid'; // Import the uuidv4 function
import { useAccount } from '../context/AccountContext';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Carters from './Carters'
import { useViews } from '../context/ViewsContext';


const Home = ({ user }) => {

    const [showcarts,setShowCarts] = useState(false)
    const refSliders = useRef([])
    const { updateItemViews } = useViews()

    const { searchQuery, listItem, setSearchQuery,cartStatus,setCartStatus,cartMessage,handleAddToCart } = useInventory()
    const [error,setError] = useState("")

    const [filteredItems, setFilteredItems] = useState([]);

    const tlRef = useRef()
    const tlReftext = useRef()
    const textRefs = useRef([])

    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);


    const handleBrandFilterClick = (album) => {
        setSearchQuery(album); // Apply the brand as a filter
    };

    const handleModelFilterClick = (genre) => {
        setSearchQuery(genre); // Apply the model as a filter
    };

    const toggleBrandDropdown = () => {
        setIsBrandOpen(!isBrandOpen);
    };

    const toggleModelDropdown = () => {
        setIsModelOpen(!isModelOpen);
    };


    useEffect(() => {
        const ctx = gsap.context(() => {
            tlRef.current = gsap.timeline({ defaults: {  ease:"sin.inOut" ,duration: 2.75 }, repeat: -1 })
            tlReftext.current = gsap.timeline({ defaults: {  ease:"sin.inOut" ,duration: 2.75 }, repeat: -1 })
            const initialClipPath = "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)";
            const initialTranslateY = "100%"
            
            refSliders.current.map((elem,i) => {
                tlRef.current.set(elem,{
                    clipPath:initialClipPath
                })
                tlReftext.current.set(textRefs.current[i],{
                    translateY:initialTranslateY
                })
            })

            refSliders.current.forEach((elem, i) => {
                // Add an animation to change the clip path to the "open" state
                tlReftext.current.fromTo(textRefs.current[i],{
                    translateY: initialTranslateY,
                },{
                    translateY:"0%",
                    delay: i * 2.75
                }, i * 2.75)
                tlReftext.current.fromTo(textRefs.current[i],{
                    translateY: "0%"
                },{
                    translateY:initialTranslateY,
                }, `+=${2.75}`)
                tlRef.current.fromTo(
                    elem,
                    {
                        clipPath: initialClipPath,
                        filter: "blur(10px)",
                    },
                    {
                        clipPath: "polygon(15% 0%, 75% 0%, 85% 100%, 25% 100%)",
                        filter: "blur(0px)",
                        delay: i * 2.75,
                    },
                    i * 2.75 // Delay each animation
                );
                // Add an animation to change the clip path back to the "closed" state
                tlRef.current.fromTo(
                    elem,
                    {
                        clipPath: "polygon(15% 0%, 75% 0%, 85% 100%, 25% 100%)",
                        filter: "blur(0px)",
                    },
                    {
                        clipPath: initialClipPath,
                        filter: "blur(10px)",
                    },
                    `+=${2.75}`
                );
            });
        })
    }, [])

    

    useEffect(() => {
        // Filter items based on the search query
        const filtered = listItem.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.album.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredItems(filtered);
    }, [searchQuery]);

    return (
        <>
        <Navbar user={user} setShowCarts={setShowCarts} showcarts={showcarts}/>        
        <Carters  user={user} setShowCarts={setShowCarts} showcarts={showcarts}/>
        { cartStatus &&
            <div className="cart-status">
                <div className="exit-button" onClick={ e => setCartStatus(false)}>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 0.499875C11.0001 0.776017 10.7763 0.999931 10.5001 1L2.50045 1.002C2.50041 1.002 2.5005 1.002 2.50045 1.002C1.67189 1.00282 1 1.6746 1 2.502V12.497C1 12.8948 1.15804 13.2764 1.43934 13.5577C1.72064 13.839 2.10218 13.997 2.5 13.997H10.595C10.8711 13.997 11.095 14.2209 11.095 14.497C11.095 14.7731 10.8711 14.997 10.595 14.997H2.5C1.83696 14.997 1.20107 14.7336 0.732233 14.2648C0.263392 13.7959 0 13.16 0 12.497V2.502C0 1.12144 1.12017 0.00324972 2.49955 0.00200029L10.4999 1.59747e-08C10.776 -6.9036e-05 10.9999 0.223733 11 0.499875ZM10.2472 4.1408C10.4456 3.94871 10.7621 3.9538 10.9542 4.15218L13.8592 7.15218C14.0469 7.34606 14.0469 7.65394 13.8592 7.84782L10.9542 10.8478C10.7621 11.0462 10.4456 11.0513 10.2472 10.8592C10.0488 10.6671 10.0437 10.3506 10.2358 10.1522L12.3198 8H4.5C4.22386 8 4 7.77614 4 7.5C4 7.22386 4.22386 7 4.5 7H12.3198L10.2358 4.84782C10.0437 4.64944 10.0488 4.3329 10.2472 4.1408Z" fill="black"/>
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
        <div className='home-component'>
            <div className="banner-component">
                <div className="cover-component">
                    <div className="img-sliders">
                        <img src="./img/img1.png" alt="" ref={e => refSliders.current.push(e) } />
                    </div>
                    <div className="img-sliders abs">
                        <img src="./img/img2.png" alt="" ref={e => refSliders.current.push(e)}/>
                    </div>
                    <div className="img-sliders abs">
                        <img src="./img/img3.png" alt="" ref={e => refSliders.current.push(e)}/>
                    </div>
                </div>
                <div className="box-text">
                    <div className="slide-text">
                        <h5 ref={e => textRefs.current.push(e)}> Jetlag </h5>
                        <h5 ref={e => textRefs.current.push(e)} className='abs'> Shadow </h5>
                        <h5 ref={e => textRefs.current.push(e)} className='abs'> Roger Rabbit </h5>
                    </div>
                </div>
            </div>
            <div className='products-component'>
                <div className="option-products">
                    <div className="br-md">
                        <div className="brand" onClick={toggleBrandDropdown}>
                            <h4>
                                Albums
                            </h4>
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L6 4.93934L10.4697 0.46967C10.7626 0.176777 11.2374 0.176777 11.5303 0.46967C11.8232 0.762563 11.8232 1.23744 11.5303 1.53033L6.53033 6.53033C6.23744 6.82322 5.76256 6.82322 5.46967 6.53033L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967Z" fill="white"/>
                            </svg>
                            {isBrandOpen && (
                                <div className="dropdown-content">
                                    {/* Dropdown content */}
                                    <p onClick={() => handleBrandFilterClick('Honeycomebear')}> Honeycomebear </p>
                                    <p onClick={() => handleBrandFilterClick('Radwimps')}> Radwimps </p>
                                    <p onClick={() => handleBrandFilterClick('Aimer')}> Aimer </p>
                                </div>
                            )}
                        </div>
                        <div className="model" onClick={toggleModelDropdown}>
                            <h4>Genre</h4>
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L6 4.93934L10.4697 0.46967C10.7626 0.176777 11.2374 0.176777 11.5303 0.46967C11.8232 0.762563 11.8232 1.23744 11.5303 1.53033L6.53033 6.53033C6.23744 6.82322 5.76256 6.82322 5.46967 6.53033L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967Z" fill="white"/>
                            </svg>
                            {isModelOpen && (
                                <div className="dropdown-content">
                                    {/* Dropdown content */}
                                    <p onClick={() => handleModelFilterClick('Chill')}> Chill </p>
                                    <p onClick={() => handleModelFilterClick('Happiness')}> Happiness </p>
                                    <p onClick={() => handleModelFilterClick('Drama')}> Drama </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="search-bar">
                        <input 
                            type="text" 
                            name='searchitem' 
                            placeholder='Search...' 
                            value={searchQuery} 
                            onChange={e => setSearchQuery(e.target.value) } 
                        />
                    </div>
                </div>

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
                                                Albums || {elem.album} <br/>
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

export default Home