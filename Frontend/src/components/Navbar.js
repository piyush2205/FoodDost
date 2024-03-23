import React, { useEffect, useRef, useState } from 'react'
import logo from "../logo.png"
import { Link, Navigate } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import "../Css/navbar.css"
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';
import { useCart } from './CartContext';
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import _ from 'lodash';
function Navbar() {
    const searchContainerRef = useRef(null);
    // console.log(searchContainerRef.current);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const { totalItems } = useCart();
    const { logOut } = useUserAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState('signup'); // 'login' or 'signup'
    const [customToken, setToken] = useState(null);
    const provider = new GoogleAuthProvider();
    const myNavigate = useNavigate()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // for search function

    useEffect(() => {
        const debouncedSearch = _.debounce(() => {
            if (searchTerm) {
                fetchResults();
            } else {
                setResults([]);
            }
        }, 300);

        debouncedSearch();

        // Cleanup debounce
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm]);

    const fetchResults = async () => {
        try {
            const response = await axios.get(`http://food-dost-api-v1.vercel.app/foodapidata/search?q=${encodeURIComponent(searchTerm)}`);
            setResults(response.data);
            setShowResults(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    // useEffect(() => {
    //     const debounceSearch = debounce(
    //         async () => {
    //             try {
    //                 const res = await axios.get(`http://food-dost-api-v1.vercel.app/foodapidata/search?q=${encodeURIComponent(searchTerm)}`)
    //                 setResult(res.data)
    //             } catch (err) {
    //                 console.log(err)
    //             }
    //         }, 300
    //     )

    //     debounceSearch()

    // }, [searchTerm])
    // console.log(result)
    // const debounce = (func, delay) => {
    //     let debounceTimer
    //     return function () {
    //         const context = this
    //         const args = arguments
    //         clearTimeout(debounceTimer)
    //         debounceTimer = setTimeout(() => func.apply(context, args), delay)
    //     }
    // }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    // .....................................................................................



    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const customLogout = () => {
        logOut();
        window.location.reload();
    }
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            signInWithGoogle();
            setIsModalOpen(false)
            // console.log(token);
            // console.log(auth.currentUser.uid);
            // console.log(auth.currentUser.displayName);
            // console.log(auth.currentUser.email);
            // console.log(auth.currentUser.photoURL);
            // customToken ? myNavigate("/") : myNavigate("/Gorakhpur")

        } catch (error) {
            console.log(error.message);
        }
    };


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const { user } = useUserAuth();
    const auth = getAuth();
    // console.log(auth.currentUser.accessToken)
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;


                // The signed-in user info.
                const user = result.user;
                console.log(user)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    // console.log(auth.currentUser.uid);
    const openModal = (mode) => {
        setModalMode(mode);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    useEffect(() => {
        // Add event listener to disable scrolling when modal is open
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Remove event listener when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);
    const handleClickOutSide = (e) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
            setShowResults(false);
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutSide);

        return () => {
            document.removeEventListener('click', handleClickOutSide);
        };
    }, []);
    // console.log(results);


    // useEffect(() => {
    const handleSearchClick = (id) => {
        console.log(id, "myid")
        setSearchTerm("")
        setInterval(() => {
            window.location.reload()
        }, 1000)
    }
    // setShowResults(false)
    // handleSearchClick()
    // })



    return (
        <>
            <header className='h-20 bg-[#ffcc00] lg:w-full shadow-md content-center items-center self-center  bg-gradient-to-r from-[#ffcc00] to-[#efdf2f] '  >
                <div className=' lg:w-[1240px]   sm:w-auto  flex items-center place-self-center justify-between  h-20 ' style={{ margin: "auto" }} >
                    <div className='items-center'>
                        <Link to={"/"}>   <img src={logo} alt='logo' className='h-16 w-16' /> </Link>
                    </div>
                    <div>
                        <div className='relative flex items-center'>
                            <input placeholder='Search for restaurant,cusie or a dish' value={searchTerm}
                                onChange={handleSearch} onClick={() => setShowResults(true)} className=' sm:h-10 sm:w-26  lg:h-10 lg:w-96 border rounded ' />
                            {<FaSearch className='absolute top-[13px] bottom-[0px] right-[15px] ' />}
                        </div>


                        {
                            searchTerm && <button onClick={() => setSearchTerm("")} className='absolute top-[-287px] bottom-[358px] left-[830px] ' >X</button>

                        }

                        {
                            results.length > 0 && <div ref={searchContainerRef} className='absolute top-15 left-57 w-[25%] h-[auto] p-2 bg-white shadow-md overflow-y-scroll '>
                                {
                                    <ul>
                                        {
                                            results.map((result) => (
                                                <Link to={`Gorakhpur/${result._id}`}
                                                    onClick={handleSearchClick}
                                                // Clear the search term on click

                                                >
                                                    <li key={result._id} className='flex items-center border p-2 gap-2 cursor-pointer '>


                                                        <img src="https://via.placeholder.com/150" alt="restaurant" style={{ width: '100px', height: '100px' }} />
                                                        <div>
                                                            <h2 className='font-bold'>{result.name}</h2>
                                                            <p>Delivery Time: {result.deliveryTimings.open} - {result.deliveryTimings.close}</p>
                                                            <p>Rating: {result.rating}</p>
                                                            <p>Cost For Two: {result.priceRange} /-</p>

                                                            <p>Address: {result.restaurantAddress.street}</p>
                                                        </div>


                                                    </li>
                                                </Link>
                                            ))
                                        }
                                    </ul>
                                }
                            </div>
                        }
                    </div>


                    {/* Responsive Navigation */}
                    <div className='lg:hidden'>
                        <button onClick={toggleMobileMenu} className='focus:outline-none'>
                            <svg className='w-6 h-6 text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                                    d='M4 6h16M4 12h16m-7 6h7'></path>
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className='lg:hidden absolute top-20 left-0 w-full bg-white shadow-md'>
                            <ul className='flex flex-col items-center gap-4 py-4'>
                                {/* Adjust your navigation links as needed */}
                                <li>
                                    <Link to='/'>Home</Link>
                                </li>

                                {user?.accessToken ?

                                    <>


                                        <div className="relative inline-block " onClick={() => toggleDropdown}>
                                            <button onClick={toggleDropdown} className="flex items-center focus:outline-none  font-semibold  sm:hidden md:hidden  ">
                                                <span><FaUserCircle className='text-3xl m-2' /> </span>
                                                <span>{user?.displayName}</span>
                                            </button>
                                            {isDropdownOpen && (
                                                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                                                    <a onClick={customLogout} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</a>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                    :
                                    < ul className='flex font-semibold gap-10 content-center items-center' >

                                        <li> <Link onClick={() => openModal('login')} className='cursor-pointer' >
                                            Login
                                        </Link></li>

                                        <li> <a onClick={() => openModal('signup')} className='cursor-pointer' >
                                            Sign Up
                                        </a></li>
                                        <div className='relative flex content-center  items-center  cursor-pointer '  ><span className='cart-svg' style={{ strokeWidth: "2px", "stroke": "#282c3f", }} ><svg className="_1GTCc _2MSid" viewBox="-1 0 37 32" height="20" width="20" ><path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path></svg><span className=' absolute cart-span'>{totalItems}</span></span>
                                            <Link to={"/Cart"} className="block  py-2 px-2 font-semibold  cursor-pointer">Cart</Link></div>
                                    </ul>


                                }
                            </ul>
                        </div>
                    )}

                    <div className='items-center flex' >

                        {user?.accessToken ?

                            <>


                                <div className="relative inline-block " onClick={() => toggleDropdown}>
                                    <button onClick={toggleDropdown} className=" items-center focus:outline-none  font-semibold  sm:hidden md:hidden lg:flex  ">
                                        <span><FaUserCircle className='text-3xl m-2' /> </span>
                                        <span>{user?.displayName}</span>
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                                            <a onClick={customLogout} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</a>
                                        </div>
                                    )}
                                </div>
                            </>
                            :
                            < ul className='lg:flex lg:font-semibold gap-10 sm:hidden md:hidden  ' >

                                <li> <Link onClick={() => openModal('login')} to={"/login"}>
                                    Login
                                </Link></li>

                                <li> <a onClick={() => openModal('signup')} href='#' >
                                    Sign Up
                                </a></li>
                            </ul>


                        }
                        <div className='relative lg:flex lg:content-center lg:justify-center lg:items-center ml-10   sm:hidden'>
                            <Link to={"/Cart"} className="flex items-center gap-2  py-2 px-2 font-semibold  cursor-pointer ">
                                <span className='cart-svg' style={{ strokeWidth: "2px", "stroke": "#282c3f", }} ><svg className="_1GTCc _2MSid" viewBox="-1 0 37 32" height="20" width="20" ><path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path></svg><span className=' absolute cart-span'>{totalItems}</span></span>
                                Cart</Link>
                        </div>


                        {isModalOpen && (
                            <>
                                {modalMode === "signup" ? (<div className='modal'>
                                    <div className='modal-content flex flex-col gap-10  ' >
                                        <div>
                                            <span itle="Close" className='close' onClick={closeModal}>&times;</span>
                                            <h2 className='font-semibold text-3xl antialiased  '>{modalMode ? "Sign Up" : "Login"}</h2>
                                        </div>

                                        <div className='border flex flex-col p-1'>
                                            <form className='flex flex-col gap-5'>
                                                <input className='border h-12 w-full rounded' type="text" placeholder='Full Name' />

                                                <input className='border  h-12 w-full rounded' type="text" placeholder='Email' />
                                            </form>

                                        </div >


                                        <div className=' border flex gap-5 items-center p-2' >
                                            < input type='checkbox' className='h-5 w-5' />
                                            <p className='text-[12px] tracking-wide'>I agree to Food Dost
                                                <span className='text-[#ff006a] font-semibold'> Terms of Service,</span>  Privacy Policy and <span className='text-[#ff0051] font-semibold'>Content Policies </span > </p>

                                        </div>
                                        <button role='button' aria-disabled="true" className='bg-[#ffcc00cf]  hover:bg-[#ffcc00] h-12 w-full text-center rounded text-[18px] font-semibold  cursor-pointer' content='Create Account' name='Create Account'>Create Account</button>

                                        <div className='flex items-center relative'>
                                            <hr className='border w-full' /> <span className='absolute left-[50%] translate-x-[-50%] from-neutral-800 text-[18px]'>or</span >
                                        </div >

                                        <GoogleButton type='dark' style={{ width: "100%" }} onClick={handleGoogleSignIn} />
                                        <div>
                                            Already have an account? <Link to={"/"} onClick={() => openModal('Signup')} className='text-[#ff006a]'>Log in</Link>
                                        </div>
                                    </div>

                                </div>) : (<div className='modal'>
                                    <div className='modal-content flex flex-col gap-10  ' >
                                        <div>
                                            <span itle="Close" className='close' onClick={closeModal}>&times;</span>
                                            <h2 className='font-semibold text-3xl antialiased  '>Login</h2>
                                        </div>

                                        <div className='border flex flex-col p-1'>
                                            <form className='flex flex-col gap-5'>
                                                <input className='border h-12 w-full rounded' type="text" placeholder='Phone' />
                                                {/* <input className='border  h-12 w-full rounded' type="text" placeholder='Email' /> */}
                                            </form>

                                        </div >

                                        <button role='button' aria-disabled="true" className='bg-[#ffcc00cf]  hover:bg-[#ffcc00] h-12 w-full text-center rounded text-[18px] font-semibold  cursor-pointer' content='Create Account' name='Create Account'>Send OTP</button>

                                        <div className='flex items-center relative'>
                                            <hr className='border w-full' /> <span className='absolute left-[50%] translate-x-[-50%] from-neutral-800 text-[18px]'>or</span >
                                        </div >

                                        <GoogleButton type='dark' style={{ width: "100%" }} onClick={handleGoogleSignIn} />
                                        <div>
                                            Don't have an account?{' '}
                                            <span className='text-[#ff006a] cursor-pointer' onClick={() => setModalMode('signup')}>
                                                Sign up
                                            </span>
                                        </div>
                                    </div>

                                </div>)}
                            </>


                        )}

                    </div>
                </div >




            </header >



        </>



    )
}

export default Navbar





