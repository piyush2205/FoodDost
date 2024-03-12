import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import OrderSection from "../components/OrderSection"
import HeroSection from "../components/HeroSection"
import LocationSection from '../components/LocationSection'
import SingleComponet from '../components/SingleComponet'

import Cart from '../components/CartContext'
import Payment from '../components/payment'
import { useUserAuth } from '../components/UserAuthContext'
import CartPage from '../components/CartPage'
import Menu from '../components/Menu'
import { lazy, Suspense } from 'react'
import Animation from '../Assets/Animation.gif'

const PopupAlert = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (


        <div className="bg-red-100 border backdrop-blur-sm w-[50%] h-[50%] m-[auto] fixed inset-0 border-red-400 bg-opacity-90 text-red-700 px-4 py-3 rounded  flex justify-center items-center" role="alert">
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

            <Suspense fallback={Animation}>
                <Routes>

                    <Route path='/' element={<HeroSection />} />

                    <Route path='/LocationSection' element={<LocationSection />} />
                    <Route path='/Gorakhpur' element={<OrderSection />} />
                    <Route path='/SingleComponet/:id' element={<SingleComponet />} />

                    <Route path='/orderNow/:id' element={<Menu />} />

                    <Route path='/Cart' element={<CartPage />} />

                    <Route path='/payment' element={
                        <ProtectedRoute>
                            <Payment />
                        </ProtectedRoute>
                    } />
                    <Route path='*' element={<HeroSection />} />
                </Routes>
            </Suspense>

        </>



    )
}

export default AllRouter