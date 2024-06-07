import React from 'react'
import "../../Css/Footer.css"
import logo from "../../Assets/logo.png"

export default function Footer() {
    return (
        <div id='footer-main' >
            <div className='flex flex-col w-[1080px] h-[461px] m-auto  items-center place-content-center gap-y-5'  >
                <img src={logo} className='w-[8%]' />
                <h1>"Bringing Deliciousness to Your Doorstep"</h1>
                <p className='w-[714px] h-[107px] footer-subheading'>Delivering delicious meals to your doorstep, FoodDost is dedicated to making every dining experience extraordinary. With a menu crafted from the finest ingredients, we ensure that every bite is a culinary delight. Thank you for choosing us to bring joy to your table.</p>

                <h1>&copy;All right reserved</h1>
                <h1>Desigend & Devlope by <span className='FooterName'>Piyush</span></h1>
            </div>

        </div>
    )
}
