import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { createUserWithEmailAndPassword } from "firebase/auth";

// /**
//  * CustomAlert component to display informational message with OTP.
//  * @param {string} message - OTP received.
//  * @param {boolean} isOpen - Show the alert if true.
//  * @param {function} onClose - Callback function to close the alert.
//  * @returns {JSX.Element|null} - Custom alert component or null if not opened.
//  */
const CustomAlert = ({ message, isOpen, onClose, }) => {
    // Do not render if not opened.
    if (!isOpen) return null;

    return (
        <div
            className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 sm:w-[40%] border backdrop-blur-sm w-[10%] h-[3%] left-[30%] top-[1%] fixed inset-0 rounded sm:h-[5%]  lg:flex sm:block justify-center items-center z-10 gap-3 " role="alert"
        >
            {/* Informational message */}
            <p className="font-bold ">Informational message</p>
            {/* Your OTP is {message}. */}
            <p className="text-sm "> {message} </p>
        </div>
    )
}
const CustomAlert2 = ({ message, isOpen, onClose, }) => {
    // Do not render if not opened.
    if (!isOpen) return null;
    return (
        <div class="  px-4 py-3 sm:w-[40%] border backdrop-blur-sm w-[10%] h-[3%] left-[30%] top-[1%] fixed inset-0 rounded sm:h-[10%]  lg:flex sm:block justify-center items-center z-10 gap-3 bg-teal-100  border-t-4 border-teal-500 rounded-b text-teal-900 shadow-md" role="alert">
            <div class="flex">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                <div>
                    <p class="font-bold">Error</p>
                    <p class="text-sm">{message}.</p>
                </div>
            </div>
        </div>
    )


}

const CustomAlert3 = ({ message, isOpen, onClose, }) => {
    // Do not render if not opened.
    if (!isOpen) return null;
    return (
        <div class="  px-4 py-3 sm:w-[40%] border backdrop-blur-sm w-[10%] h-[3%] left-[30%] top-[1%] fixed inset-0 rounded sm:h-[10%]  lg:flex sm:block justify-center items-center z-10 gap-3 bg-teal-100  border-t-4 border-teal-500 rounded-b text-teal-900 shadow-md" role="alert">
            <div class="flex">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                <div>
                    <p class="font-bold">Success</p>
                    <p class="text-sm">{message}.</p>
                </div>
            </div>
        </div>
    )


}
function Navbar() {
    const searchContainerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    // console.log(searchContainerRef.current);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const { totalItems } = useCart();
    const { logOut } = useUserAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpen2, setIsModalOpen2] = useState(false)
    const [modalMode, setModalMode] = useState('signup'); // 'login' or 'signup'
    const [customToken, setToken] = useState(null);
    const provider = new GoogleAuthProvider();
    const myNavigate = useNavigate()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // const { user, setUser } = useUserAuth();
    const [UserEmail, setUserEmail] = useState("");
    const [UserName, setUserName] = useState("");
    const [UserPassword, setUserPassword] = useState("");
    const [isAgreed, setIsAgreed] = useState(false);
    const [isotpVerified, setIsotpVerified] = useState(false);


    // for search function............................................................................

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
            const response = await axios.get(`https://fooddost.onrender.com/foodapidata/search?q=${encodeURIComponent(searchTerm)}`);
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
    //                 const res = await axios.get(`https://fooddost.onrender.com/foodapidata/search?q=${encodeURIComponent(searchTerm)}`)
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
        setTimeout(() => {
            setIsMobileMenuOpen(false);
        }, 5000);
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
        setTimeout(() => {
            setIsDropdownOpen(false);
        }, 2000)

    };

    // ................................................................................................................

    // google sign in
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
                const photoURL = user.photoURL;
                console.log(photoURL)
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

    // .....................................................................
    //handle custom signup


    const HandlePassword = (e) => {
        // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        // if (regex.test(e.target.value)) {

        setUserPassword(e.target.value);
        // }
    }

    const [showPopup2, setShowPopup2] = useState(false);
    const [showAlert2, setShowAlert2] = useState("");
    const [showPopup3, setShowPopup3] = useState(false);
    const [showAlert3, setShowAlert3] = useState("");
    const handleCustomSignUp = async (e) => {
        e.preventDefault();
        // console.log(UserEmail, UserName)
        localStorage.setItem('userName', UserName)
        if (isAgreed) {
            console.log('Form submitted!');
            // Submit your form logic here
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, UserEmail, UserPassword);
            const user = userCredential.user;
            console.log(user)
            // Update the user's profile with their name
            // await user({
            //     displayName: UserName,
            // });
            myNavigate("/")
            setIsModalOpen(false)
            setShowPopup3(true)
            setTimeout(() => {

                setShowPopup3(false)
            }, 3000)
            setShowAlert3("User registered successfully");
            console.log('User registered with name:', user.displayName);
            // User registered successfully, you can redirect them or show a success message

        } catch (error) {
            console.log(error.message);
            setTimeout(() => {

                setShowPopup2(false)
            }, 3000)

            setShowPopup2(true)
            console.error('Error registering user:', error.message);
            setShowAlert2(error.message);
            // Handle errors here, such as showing an error message to the user
        }

    };



    const handleCheckboxChange = (e) => {
        setIsAgreed(e.target.checked);
    };



    // .....................................................
    // handdle otp

    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const otpInputRefs = useRef([]);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [otpStatus, setOtpStatus] = useState('');
    const handlePhoneNumberChange = (e) => {
        const regex = /^[0-9\b]+$/;
        const value = e.target.value;
        if ((value === '' || regex.test(value)) && value.length <= 10) {
            setPhoneNumber(value);
        }
        // if (e.target.value === '' || regex.test(e.target.value)) {
        //     setPhoneNumber(e.target.value < 10 ? '0' + e.target.value : e.target.value);
        // }
    };



    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        // console.log(newOtp, otp)
        if (value && index < otp.length - 1) {
            otpInputRefs.current[index + 1].focus();
        }

    };


    // ....................................................
    const [showPopup, setShowPopup] = useState(false);
    const handleSendOtp = async () => {
        // try {
        //     const response = await axios.post('/send-otp', { phoneNumber });
        //     console.log('OTP Sent:', response.data);
        // Generates 6 digit OTP

        if (phoneNumber.length === 0 || !phoneNumber.match(/^\d{10}$/)) {
            setOtpStatus('Please enter a valid phone number');
            setIsOtpSent(false);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 10000);

            return;
        } else {
            const otp = Math.floor(1000 + Math.random() * 9000);
            setIsOtpSent(true);
            setGeneratedOtp(otp.toString());
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 10000);
            setOtpStatus('OTP Sent Successfully!');

        }

        // alert(); // In real scenario, you would send this OTP to user's phone or email
        // } catch (error) {
        // console.error('Error sending OTP:', error);
        // } 
        // setIsModalOpen2(true);

        // setOtpStatus('OTP Sent Successfully!');
        // window.alert(<customAlert message={otp} />)

        // console.log(generatedOtp)
        // console.log(otp)
    };



    const handleVerifyOtp = async () => {
        // console.log(generatedOtp, "generatedOtp")
        // console.log(otp.join(''), "otp")
        if (otp.join('') === generatedOtp) {
            setOtpStatus('OTP Verified Successfully!');
            setGeneratedOtp('');
            setIsotpVerified(true);
            setIsOtpSent(!isOtpSent);
            // console.log('OTP Verified Successfully!');
            // setIsModalOpen(false);
            // Update your state to indicate that OTP verification is successful

            // Proceed with login or registration
            localStorage.setItem('phoneNumber', phoneNumber);
            // console.log(localStorage.getItem('phoneNumber'))
            // myNavigate("/Gorakhpur")
            setModalMode('signup');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                // setIsModalOpen(false);
            }, 3000)

        } else {
            console.log('Invalid OTP. Please try again.');
            // setIsModalOpen(false);
            // Update your state to indicate that OTP verification failed
            setShowPopup(true);

            setIsotpVerified(false);
            // setIsOtpSent(false);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000)
            setOtpStatus('Invalid OTP. Please try again.');


        }
        // const enteredOtp = otp.join('');
        // console.log(enteredOtp)
        // try {
        //     const response = await axios.post('/verify-otp', { phoneNumber, otp: enteredOtp });
        //     console.log('OTP Verified:', response.data);
        //     // Proceed with login or registration if OTP is verified successfully
        // } catch (error) {
        //     console.error('Error verifying OTP:', error);
        // }
    };
    // console.log(phoneNumber)
    useEffect(() => {
        // console.log(otpInputRefs)
        // Focus on the first OTP input field when OTP is sent
        if (isOtpSent) {

            otpInputRefs.current[0].focus();
        }
    }, [isOtpSent]);
    // .....................................................

    // .............................................................................................................
    // for modal
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
            setSearchTerm("")
            console.log("hello")

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
        }, 100)
    }
    // setShowResults(false)
    // handleSearchClick()
    // })


    return (

        <>

            <CustomAlert
                message={isotpVerified ? otpStatus : `${otpStatus} your OTP is ${generatedOtp}`}

                onClose={() => setOtpStatus('')}
                isOpen={showPopup}

            />
            <CustomAlert2
                message={showAlert2}
                isOpen={showPopup2}
            />

            <CustomAlert3
                message={showAlert3}
                isOpen={showPopup3}
            />
            <header className='h-25 bg-[#ffcc00] text-center w-full shadow-md content-center items-center self-center  bg-gradient-to-r from-[#ffcc00] to-[#efdf2f] '  >
                <marquee behavior="scroll" direction="left" scrollamount="22" className='bg-[#fffb0028] text-center text-[#000000] text-xl'>
                    📣 Welcome to FoodDost ,grab limited offer 1000Rs  📣
                </marquee>

                <div className='   lg:w-[1240px]  md:w-[768px] sm:w-[640px] sm:px-4  lg:px-0 md:px-0 flex items-center place-self-center justify-between  h-20  relative m-[auto] my-class-Navbar-div '  >
                    <div className='items-center'>
                        <Link to={"/"}>   <img src={logo} alt='logo' className='h-16 w-16' /> </Link>
                    </div>

                    {/* Search bar */}
                    <div >
                        <div className='relative flex items-center'>
                            <input placeholder='Search for restaurant,cusie or a dish' value={searchTerm} type="text"
                                onChange={handleSearch} onClick={() => setShowResults(true)} className=' sm:h-10 sm:w-26  lg:h-10 lg:w-96 border border-gray-400 rounded-3xl p-1  search_input' />
                            {<FaSearch className=' search_icons absolute top-[13px] bottom-[0px] right-[15px] ' />}
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
                    {/* Search bar */}

                    {/* Responsive Navigation */}
                    {/* Mobile Menu Hamburger */}
                    <div className='lg:hidden md:hidden sm:hidden mobile-menu-humburger'>
                        <button onClick={toggleMobileMenu} className='focus:outline-none'>
                            <svg className='w-6 h-6 text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                                    d='M4 6h16M4 12h16m-7 6h7'></path>
                            </svg>
                        </button>
                    </div>
                    {/*close mobile menu hamburger  */}

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div className=' absolute top-20 left-0 w-full bg-white shadow-md'>
                            <ul className='flex flex-col items-center gap-4 py-4'>
                                {/* Adjust your navigation links as needed */}
                                <li>
                                    <Link to='/'>Home</Link>
                                </li>

                                {user?.accessToken ?

                                    <>


                                        <div className="relative inline-block " onClick={() => toggleDropdown}>
                                            <button onClick={toggleDropdown} className="flex items-center focus:outline-none  font-semibold   ">
                                                {
                                                    user?.photoURL ?
                                                        <img src={user?.photoURL} alt="Profile" className="w-10 h-10 rounded-full"></img>
                                                        : <FaUserCircle className='text-3xl m-2 ' />
                                                }
                                                <span className="pl-2">{user?.displayName || localStorage.getItem('userName')}</span>
                                            </button>
                                            {isDropdownOpen && (
                                                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                                    <Link to={"/profile"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                                    <Link to={"/settings"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                                                    <Link onClick={customLogout} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</Link>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                    :
                                    < ul className='flex font-semibold gap-10 content-center items-center ' >

                                        <li> <Link onClick={() => openModal('login')} className='cursor-pointer' >
                                            Login
                                        </Link></li>

                                        <li> <Link onClick={() => openModal('signup')} className='cursor-pointer' >
                                            Sign Up
                                        </Link></li>
                                        <div className='relative flex content-center  items-center  cursor-pointer '  ><span className='cart-svg' style={{ strokeWidth: "2px", "stroke": "#282c3f", }} ><svg className="_1GTCc _2MSid" viewBox="-1 0 37 32" height="20" width="20" ><path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path></svg><span className=' absolute cart-span'>{totalItems}</span></span>
                                            <Link to={"/Cart"} className="block  py-2 px-2 font-semibold  cursor-pointer">Cart</Link></div>
                                    </ul>


                                }
                            </ul>
                        </div>
                    )}

                    {/* close mobile menu dropdown */}

                    {/* User label and Navigation */}
                    <div className='items-center flex gap-2 my-navigation-login-singup  ' >

                        {user?.accessToken ?




                            <div className="relative inline-block " onClick={() => toggleDropdown}>
                                <button onClick={toggleDropdown} className=" items-center focus:outline-none  font-semibold  lg:flex  ">
                                    {
                                        user?.photoURL ?
                                            <img src={user?.photoURL} alt="Profile" className="w-10 h-10 rounded-full"></img>
                                            : <FaUserCircle className='text-3xl m-2 ' />
                                    }
                                    <span className="pl-2">{user?.displayName || localStorage.getItem('userName')}</span>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                                        <Link onClick={customLogout} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</Link>
                                    </div>
                                )}
                            </div>

                            :
                            < ul className='lg:flex lg:font-semibold gap-10 md:flex sm:flex content-center items-center  my-class-ul-login-signup ' >

                                <li> <Link onClick={() => openModal('login')} >
                                    Login
                                </Link></li>

                                <li> <Link onClick={() => openModal('signup')} >
                                    Sign Up
                                </Link></li>
                            </ul>


                        }
                        <div className='relative lg:flex lg:content-center lg:justify-center lg:items-center ml-10  '>
                            <Link to={"/Cart"} className="flex items-center gap-2  py-2 px-2 font-semibold  cursor-pointer ">
                                <span className='cart-svg' style={{ strokeWidth: "2px", "stroke": "#282c3f", }} ><svg className="_1GTCc _2MSid" viewBox="-1 0 37 32" height="20" width="20" ><path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path></svg><span className=' absolute cart-span'>{totalItems}</span></span>
                                Cart</Link>
                        </div>



                    </div>
                </div >

                {/* Sign Up and Login Modal */}
                {isModalOpen && (
                    <>
                        {modalMode === "signup" ? (<div className='modal'>




                            <div className='modal-content flex flex-col gap-10  ' >
                                <div>
                                    <span itle="Close" className='close' onClick={closeModal}>&times;</span>
                                    <h2 className='font-semibold text-3xl antialiased  '>{modalMode ? "Sign Up" : "Login"}</h2>
                                </div>
                                {
                                    modalMode ? <p className='text-lg font-semibold'>Enter your details to register</p> : <p className='text-lg font-semibold'>Enter your details to Login</p>
                                }
                                <div className='border flex flex-col p-1'>
                                    <form className='flex flex-col gap-5'>
                                        <input className='border h-12 w-full rounded' type="text" placeholder='Full Name' required value={UserName} onChange={(e) => setUserName(e.target.value)} />

                                        <input className='border  h-12 w-full rounded' type="email" placeholder='Email' required value={UserEmail} onChange={(e) => setUserEmail(e.target.value)} />


                                        <input className='border  h-12 w-full rounded' type="password" placeholder='Password' required={true} value={UserPassword} onChange={HandlePassword} />
                                    </form>

                                </div >


                                <div className=' border flex gap-5 items-center p-2' >
                                    < input type='checkbox' checked={isAgreed}
                                        onChange={handleCheckboxChange} className='h-5 w-5 ' />
                                    <p className='text-[12px] tracking-wide'>I agree to Food Dost
                                        <span className='text-[#ff006a] font-semibold'> Terms of Service,</span>  Privacy Policy and <span className='text-[#ff0051] font-semibold'>Content Policies </span > </p>

                                </div>
                                <button role='button' aria-disabled="true" className=' hover:bg-[#f1ca30]  disabled:bg-[#ffcc0074]  bg-[#ffcc00] h-12 w-full text-center rounded text-[18px] font-semibold  cursor-pointer' type='submit' disabled={!isAgreed} onClick={handleCustomSignUp} content='Create Account' name='Create Account'>Create Account</button>

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


                                {/* OTP Input */}
                                {isOtpSent ?
                                    <>
                                        <div className='border flex justify-between flex-row p-1'>
                                            <h2>Enter OTP</h2>
                                            <Link onClick={() => setIsOtpSent(false)} >Back</Link>
                                        </div>

                                        <div className="otp-input flex  flex-row gap-2">
                                            {otp.map((digit, index) => (
                                                <input
                                                    className='border h-12 w-full rounded text-center'
                                                    key={index}
                                                    ref={(el) => (otpInputRefs.current[index] = el)} // Create ref for each OTP input field
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="\d*"
                                                    maxLength="1"
                                                    value={digit}
                                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                                />
                                            ))}
                                        </div>
                                        <button onClick={handleVerifyOtp} className='bg-[#ffcc00cf]  hover:bg-[#ffcc00] h-12 w-full text-center rounded text-[18px] font-semibold  cursor-pointer' >Verify OTP</button></> : <>
                                        <div className='border flex flex-col p-1'>
                                            <form className='flex flex-col gap-5'>
                                                <input className='border h-12 w-full rounded' type="text" placeholder='Phone' required={true} value={phoneNumber} onChange={handlePhoneNumberChange} />

                                            </form>

                                        </div >

                                        <button role='button' aria-disabled="true" className='bg-[#ffcc00cf]  hover:bg-[#ffcc00] h-12 w-full text-center rounded text-[18px] font-semibold disabled:bg-[#ffcc0074]  cursor-pointer' content='Create Account' name='Create Account' disabled={!phoneNumber} onClick={handleSendOtp} >Send OTP</button> </>

                                }
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


            </header >



        </>



    )
}

export default Navbar





