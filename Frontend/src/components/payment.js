import React from 'react'
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import "../Css/payment.css"
import { useCart } from './Context/CartContext';
import Animation1 from "../Assets/Animation-1.gif"
function Payment() {
    const navigate = useNavigate()

    const { TotalPrice } = useCart();

    const [isOrder, setIsOrder] = useState(false)

    const [address, setAddress] = useState({
        street: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAddress({ street: '', city: '', postalCode: '', country: '' });
        setTimeout(() => {
            setIsOrder(true)

        }, 1000)
        setTimeout(() => {
            navigate("/")
        }, 7000)
        // Perform any necessary actions with the address data (e.g., submit to a server, update state, etc.)
        console.log('Submitted Address:', address);
    };



    return isOrder ? <div className='lg:w-[1240px] md:w-[700px] sm:w-[640px] m-auto lg:flex  px-8 py-8 border items-center align-center justify-around' >< img src={Animation1} className='h-[250px] w-[250px]' /></div> : (


        <div className='lg:w-[1240px] md:w-[700px] sm:w-[640px] m-auto lg:flex  px-8 py-8 border items-center align-center justify-around' >

            <div className='lg:w-[500px] md:w-[300px] sm:w-[200px] border p-2 flex flex-col  m-auto '>
                <form onSubmit={handleSubmit} className='flex flex-col align-center'>
                    <label>
                        Street:
                        <input className='border' type="text" name="street" required value={address.street} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        City:
                        <input type="text" className='border' name="city" required value={address.city} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Postal Code:
                        <input type="text" className='border' name="postalCode" required value={address.postalCode} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Country:
                        <input type="text" className='border' name="country" value={address.country} onChange={handleChange} />
                    </label>
                    <br />
                    <button type="submit" className='bg-[#ffcc00] hover:bg-[#ffcc00cf] text-white font-bold py-2 px-4 rounded' >Submit</button>
                </form>

            </div>



            <div className='lg:w-[500px] md:w-[300px] sm:w-[200px] p-2 flex flex-col     align-center m-auto '>
                <h1 className='font-semibold text-center lg:text-4xl md:text-3xl sm:text-2xl'>Bill Details</h1>
                <p className='font-semibold text-xl  ' >Item Total :&#8377;{TotalPrice}</p>

                <p className='font-semibold text-xl  '>
                    Delivery Fee | 3.5 kms :29
                </p>
                <p className='font-semibold text-xl  '>Platform fee : 5.003</p>
                <p className='font-semibold text-xl  '>
                    GST and Restaurant Charges:
                    45.54
                </p>
                <h1 className='font-semibold text-2xl'>
                    TO PAY :&#8377; {Math.round(TotalPrice + 29 + 5.03 + 45.54)}
                </h1>

            </div>

        </div >
    );
};


export default Payment

