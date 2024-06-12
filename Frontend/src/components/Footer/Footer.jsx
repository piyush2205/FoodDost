import React from 'react'
import "../../Css/Footer.css"
import logo from "../../Assets/logo.png"
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
export default function Footer() {
    return (
        <>


            <div id="footer-main" className="bg-[#ED4949]  py-10">
                <div className="flex flex-col items-center place-content-center gap-y-5 px-4 md:px-0 mx-auto w-full max-w-[1080px] h-auto md:h-[461px]">
                    <img src={logo} className="w-[30%] md:w-[8%]" alt="FoodDost Logo" />
                    <h1 className="text-center text-xl md:text-2xl">"Bringing Deliciousness to Your Doorstep"</h1>
                    <p className="w-full max-w-[714px] text-center text-sm md:text-base footer-subheading">Delivering delicious meals to your doorstep, FoodDost is dedicated to making every dining experience extraordinary. With a menu crafted from the finest ingredients, we ensure that every bite is a culinary delight. Thank you for choosing us to bring joy to your table.</p>
                    <div className="flex space-x-4 mt-4">
                        {/* <!-- Add your social media icons here, for example: --> */}
                        <a href="#"> <FaFacebook className="w-6 h-6" /></a>
                        <a href="#"><FaLinkedin className="w-6 h-6" /></a>
                        <a href="#"><FaGithub className='w-6 h-6' /></a>
                    </div>
                    <h1 className="text-sm md:text-base">&copy; All rights reserved</h1>
                    <h1 className="text-sm md:text-base">Designed & Developed by <span className="FooterName">Piyush</span></h1>
                </div>
            </div>
        </>
    )
}
