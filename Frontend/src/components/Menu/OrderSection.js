import React, { useCallback, useEffect, useState } from 'react'
// import pizza from "../Assets/pizza.jpg"
// import burger from "../Assets/burger.jpg"
// import "../Css/Swiper.css"
import axios from "axios"
import CardComponent from './cardComponent'

import { LiaArrowCircleLeftSolid } from "react-icons/lia";
import { LiaArrowCircleRightSolid } from "react-icons/lia";
// import "../Css/OrderSection.css"
import Breadcrum from '../Breadcrum';
// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
function OrderSection() {

    const [isRating4PlusActive, setRating4PlusActive] = useState(false);
    const [isFilterEmpty, setIsFilterEmpty] = useState(false);
    const [foodData, SetFoodData] = useState([])
    const [loading, setLoading] = useState(false)

    const handleApiCall = async () => {
        setLoading(false)
        // https://fooddost.onrender.com/foodapidata
        // http://localhost:2223/foodapidata
        axios.get(`https://fooddost.onrender.com/foodapidata`).then((res) => {
            // console.log(res.data)

            SetFoodData(res.data)
            setLoading(true)
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        })
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        handleApiCall()
        // console.log(foodData)
    }, [])


    const handleRating = () => {
        const newFood = foodData.filter((el) => el.rating > 4);
        SetFoodData(newFood);
        setIsFilterEmpty(newFood.length === 0);
        setRating4PlusActive(!isRating4PlusActive);
    };

    const handlePureveg = () => {
        const newFood = foodData.filter((el) => el.IsVeg === true);
        SetFoodData(newFood);
        setIsFilterEmpty(newFood.length === 0);
    };

    const handleClear = () => {

        handleApiCall();
        setRating4PlusActive(false);
        setIsFilterEmpty(false);
    };

    const handleLessThan300 = () => {
        const newFood = foodData.filter((el) => el.priceRange < 300);
        SetFoodData(newFood);
        setIsFilterEmpty(newFood.length === 0);
    };

    // const [timer, setTimer] = useState(60)
    // useEffect(() => {
    //     setTimeout(() => {
    //         setTimer(timer - 1)
    //     }, 1000)
    // })
    return (
        <>
            <h1 className='font-semibold text-4xl sm:text-5xl block  antialiased text-center mt-10 mb-10 '>Best
                <span className='text-[#ED4949]' > Food</span> in Your City</h1>
            {/* <div className='main-container'>
                &#10094;
                <div className='inner-conatiner' >
                    <img src={`${pizza}`}></img>
                    <img src={`${burger}`}></img>
                    <img src={`${pizza}`}></img>
                    <img src={`${burger}`}></img>
                    <img src={`${pizza}`}></img>
                    <img src={`${burger}`}></img>
                    <img src={`${pizza}`}></img>
                    <img src={`${burger}`}></img>
                    <img src={`${pizza}`}></img>
                    <img src={`${burger}`}></img>

                </div>

                &#10095;

            </div>
            <div className='w-full ' >
                <div className='w-[1240px] m-auto'>
                    <h1 className='font-semibold text-4xl antialiased  mt-10 mb-10 '>Top Restaurant</h1>
                    <LiaArrowCircleLeftSolid />
                    <div className='border-2 w-full  overflow-hidden m-auto flex h-64 '>
                        <button  >prev</button>
                        {foodData.map((foodData, i) =>

                            <div key={i} className='m-10  h-fit border-2 w-[300px] h-auto carousel '>

                                <img className=' w-7 h-7 ' alt={foodData.id} src='https://th.bing.com/th/id/OIP.QuUTQeb-TCUWgMOu27vgRAHaE7?w=262&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' />
                                <h1>{foodData.name} </h1>
                                <p>{foodData.restaurantAddress.street}</p>
                                <p> {foodData.restaurantAddress.city}</p>

                                <p>{foodData.rating}</p>
                                {console.log(i)}
                            </div>


                        )}
                        <button  >next </button>
                    </div>
                    <LiaArrowCircleRightSolid />
                </div>

            </div> */}


            <Breadcrum />
            <div className='  border-b m-auto lg:w-[1080px] '>

                <div className=' flex flex-wrap py-4 gap-2'>


                    <button onClick={handleRating} className="rounded-[50px] bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " >Ratings 4.0+</button>

                    <button onClick={handlePureveg} className="rounded-[50px] bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " >Pure Veg</button>
                    <button onClick={handleLessThan300} className="rounded-[50px] bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " >Less Than Rs.300</button>
                    <button onClick={handleClear} className="rounded-[50px] bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " >Clear Filters</button>
                </div>

            </div>
            {
                loading ? <div className="flex  items-center justify-center lg:w-[1080px] m-[auto] ">

                    {isFilterEmpty ? (
                        <p><p>No items available based on the current filter.</p></p>
                    ) : (
                        <div className="flex flex-wrap items-center justify-center gap-[15px] mt-[20px] mb-[100px] " >
                            {foodData.map((el, i) => {
                                return <CardComponent {...el} key={i} />;
                            })}
                        </div>
                    )}

                </div> :
                    <>

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
                                        <div className="h-4 bg-gray-300 w-1/2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>

            }

        </>



    )
}

export default OrderSection
