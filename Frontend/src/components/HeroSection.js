import React from 'react'
import hero from "../Assets/hero.jpg"
import LocationSection from './LocationSection'
function HeroSection() {
    return (
        <>
            <div className='  z-2   bg-gray-100  sm:h-[376px]  md:h-[615px] lg:h-[615px] sm:w-auto  md:w-auto lg:w-full  bg-cover  bg-opacity-80  bg-no-repeat  grid  content-center justify-center ' style={{ margin: "auto", backgroundImage: `url(${hero})` }}  >


                <div className='bg-black w-screen  sm:w-[376px]  md:w-[960px] lg:w-full bg-opacity-50  bg-cover  p-10   '>
                    <h1 className='text-[#ffcc00] font-semibold text-8xl antialiased text-center ' style={{ "fontFamily": 'DM Sans Display', }}>Food Dost</h1>
                    <p className='text-white font-semibold text-2xl antialiased text-center m-1'>
                        Savor the Flavorful Journey with Your Culinary Companion!</p>
                </div>


            </div >
            <LocationSection />
        </>
    )
}

export default HeroSection