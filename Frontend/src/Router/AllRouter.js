import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
// import OrderSection from "../components/OrderSection"
// import HeroSection from "../components/HeroSection"
import LocationSection from '../components/LocationSection'
// import SingleComponet from '../components/SingleComponet'

import Cart from '../components/CartContext'
// import Payment from '../components/payment'
import { useUserAuth } from '../components/UserAuthContext'
// import CartPage from '../components/CartPage'
// import Menu from '../components/Menu'
import { lazy, Suspense } from 'react'
import Animation from '../Assets/Animation.gif'
import UserProfilePage from '../components/UserProfilePage'
import UserSettings from '../components/UserSettings'
// import OTPPage from '../components/Sendotp'
// import Navbar from '../components/Navbar'


//lazy loading
const OrderSection = lazy(() => import('../components/OrderSection'))
const HeroSection = lazy(() => import('../components/HeroSection'))
const SingleComponet = lazy(() => import('../components/SingleComponet'))
// const Login = lazy(() => import('../components/Login'))
const Menu = lazy(() => import('../components/Menu'))
const Payment = lazy(() => import('../components/payment'))
const CartPage = lazy(() => import('../components/CartPage'))
const Navbar = lazy(() => import('../components/Navbar'))
const Footer = lazy(() => import('../components/Footer'))


const PopupAlert = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className=" sm:w-[50%] bg-red-100 border backdrop-blur-sm w-[50%] h-[50%] m-[auto] fixed inset-0 border-red-400 bg-opacity-90 text-red-700 px-4 py-3 rounded sm:h-[30%]  lg:flex sm:block justify-center items-center" role="alert">
            <strong className="font-bold text-2xl m-2">Namaste!</strong>
            <span className="block sm:inline text-2xl m-2">{message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg onClick={onClose} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
        </div>
    );
};
function AllRouter() {
    const [showPopup, setShowPopup] = useState(false);
    const ProtectedRoute = ({ children }) => {
        const { user } = useUserAuth();

        console.log("Check user in Private: ", user);
        useEffect(() => {
            if (!user) {
                setShowPopup(true);
                // Optionally, clear the alert after a few seconds
                const timer = setTimeout(() => setShowPopup(false), 100000);
                return () => clearTimeout(timer);
            }
        }, [user]);
        if (!user) {
            // Wait a moment before redirecting to allow the alert to be noticed
            setTimeout(() => {
                setShowPopup(false); // Ensure alert is cleared on redirect
            }, 10000); // Adjust timing as needed
            return <Navigate to="/Gorakhpur" replace />;
        }
        return children;
    };
    return (
        <>
            <PopupAlert
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                message="You need to be logged in to access this page."
            />

            {/* Your Routes */}

            <Suspense fallback={
                <div role="status">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            }>
                <Routes>

                    <Route path='/' element={<HeroSection />} />

                    {/* <Route path='/LocationSection' element={<LocationSection />} /> */}
                    <Route path='/Gorakhpur' element={<OrderSection />} />
                    <Route path='/Gorakhpur/SingleComponet/:id' element={<SingleComponet />} />
                    <Route path='/Gorakhpur/:id' element={<Menu />} />
                    <Route path='/Cart' element={<CartPage />} />
                    <Route path='/payment' element={
                        <ProtectedRoute>
                            <Payment />
                        </ProtectedRoute>
                    } />

                    <Route path='/profile' element={
                        <ProtectedRoute>
                            <UserProfilePage />
                        </ProtectedRoute>

                    } />
                    <Route path='/settings' element={
                        <ProtectedRoute>
                            <UserSettings /></ProtectedRoute>}
                    />

                    {/* <Route path="/login" element={<HeroSection />} > */}

                    {/* </Route> */}
                    <Route path='*' element={

                        <>

                            <h1 className='text-3xl font-bold text-center'>
                                Page Not Found
                            </h1>
                            <h1 className='text-3xl font-bold text-center'>
                                404
                            </h1>
                            <p className='text-center'>
                                The page you are looking for does not exist
                            </p>

                            <footer />
                        </>
                    } />
                </Routes >
            </Suspense >

        </>



    )
}

export default AllRouter