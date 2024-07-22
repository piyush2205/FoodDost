import React, { useEffect, useState } from 'react';
import axios from "axios";
import CardComponent from './cardComponent';
import { MdOutlineClose } from "react-icons/md";
import Breadcrum from '../Breadcrum';

function OrderSection() {
    const [isRating4PlusActive, setRating4PlusActive] = useState(false);
    const [isFilterEmpty, setIsFilterEmpty] = useState(false);
    const [foodData, setFoodData] = useState([]);
    const [originalFoodData, setOriginalFoodData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isPureVegActive, setPureVegActive] = useState(false);
    const [isLessThan300Active, setIsLessThan300Active] = useState(false);

    const handleApiCall = async () => {
        setLoading(true);
        axios.get(`https://fooddost.onrender.com/foodapidata`)
            .then((res) => {
                setFoodData(res.data);
                setOriginalFoodData(res.data);
                setLoading(false);
                setIsFilterEmpty(false)
            }).catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        handleApiCall();
    }, []);
    const applyFilters = () => {
        let filteredData = originalFoodData;

        if (isRating4PlusActive) {
            filteredData = filteredData.filter((el) => el.rating > 4);
        }
        if (isPureVegActive) {
            filteredData = filteredData.filter((el) => el.IsVeg === true);
        }
        if (isLessThan300Active) {
            filteredData = filteredData.filter((el) => el.priceRange < 300);
        }

        setFoodData(filteredData);
        setIsFilterEmpty(filteredData.length === 0);
    };

    const handleRating = () => {
        setRating4PlusActive(!isRating4PlusActive);
    };

    const handlePureVeg = () => {
        setPureVegActive(!isPureVegActive);
    };

    const handleLessThan300 = () => {
        setIsLessThan300Active(!isLessThan300Active);
    };

    const handleClear = () => {
        setFoodData(originalFoodData);
        setRating4PlusActive(false);
        setPureVegActive(false);
        setIsLessThan300Active(false);
        setIsFilterEmpty(false);
    };

    useEffect(() => {
        applyFilters();
    }, [isRating4PlusActive, isPureVegActive, isLessThan300Active]);

    return (
        <>
            <h1 className='font-semibold text-4xl sm:text-5xl block antialiased text-center mt-10 mb-10'>
                Best <span className='text-[#ED4949]'>Food</span> in Your City
            </h1>

            <Breadcrum />
            <div className='border-b m-auto lg:w-[1080px]'>
                <div className='flex flex-wrap py-4 gap-2'>
                    <button
                        onClick={handleRating}
                        className={`rounded-[50px] bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex gap-1 ${isRating4PlusActive ? 'active' : ''}`}
                    >
                        Ratings 4.0+
                        {isRating4PlusActive && <MdOutlineClose className='self-center' />}
                    </button>
                    <button
                        onClick={handlePureVeg}
                        className={`rounded-[50px] bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex gap-1 ${isPureVegActive ? 'active' : ''}`}
                    >
                        Pure Veg
                        {isPureVegActive && <MdOutlineClose className='self-center' />}
                    </button>
                    <button
                        onClick={handleLessThan300}
                        className={`rounded-[50px] bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex gap-1 ${isRating4PlusActive ? 'active' : ''}`}
                    >
                        Less Than Rs.300
                        {isLessThan300Active && <MdOutlineClose className='self-center' />}
                    </button>
                    <button
                        onClick={handleClear}
                        className="rounded-[50px] bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex min-h-screen items-center justify-center">

                    <div className="w-1/3">

                        <div className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse">
                            <div className="h-48 bg-gray-300"></div>
                            <div className="px-6 py-4">

                                <div className="h-6 bg-gray-300 mb-2"></div>
                                <div className="h-4 bg-gray-300 w-2/3"></div>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
                                <div className="h-4 bg-gray-300 w-1/2 mb-2"></div>
                                <div className="h-4 w-1/2 mb-2">wait for few minute </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center lg:w-[1080px] m-auto">
                    {isFilterEmpty ? (
                        <p>No items available based on the current filter.</p>
                    ) : (
                        <div className="flex flex-wrap items-center justify-center gap-[15px] mt-[20px] mb-[100px]">
                            {foodData.map((el, i) => (
                                <CardComponent {...el} key={i} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default OrderSection;



