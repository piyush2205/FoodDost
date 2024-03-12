import React from 'react'
import { Link } from "react-router-dom"

function LocationSection() {

    return (
        <>
            <div className='bg-black w-screen   bg-cover  p-10  sm:h-[376px]  md:w-auto lg:w-full '>
                <h1 className='font-semibold text-6xl antialiased text-center text-[#ffcc00] '> Found Your Food</h1>
                <p className='font-semibold text-2xl antialiased text-center text-[#f4f3f0] '>Here you can find all the restaurants</p>
                <div className='flex content-center place-content-center my-2.5  '>
                    <Link to="/Gorakhpur">  <div className='w-96 text-center bg-white-400 h-24 shadow-lg  shadow-outline border content-center place-content-center'>


                        <h1 className='font-semibold text-6xl antialiased text-center my-3  text-[#fff]'> Gorakhpur</h1>


                    </div></Link>

                </div>
            </div>

        </>


    )
}

export default LocationSection