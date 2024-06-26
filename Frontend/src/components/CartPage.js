import React from 'react'
import { useCart } from './Context/CartContext';
import Breadcrum from './Breadcrum';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import emptyCart from "../Assets/empty-cart.jpeg"
const CartPage = () => {
    const { quantities, totalItems, TotalPrice, removeFromCart, restaurantName } = useCart();
    console.log(TotalPrice, quantities, totalItems, restaurantName)
    const handleDelete = (itemId) => {
        removeFromCart(itemId)
    }

    return (
        <div className="container mx-auto lg:w-[1224px] md:w-[768px] sm:w-[640px] mt-10">
            <Breadcrum />
            <h1 className="lg:text-3xl md:text-2xl sm:text-xs Poppins font-semibold mb-8"> Your Food Court</h1>
            {
                totalItems === 0 ? <img className='w-[70vw] h-[auto]  m-[auto] ' src={emptyCart} /> : <h1 className='lg:text-3xl md:text-2xl sm:text-xs Poppins py-4 '>
                    Restaurant Name : {restaurantName}
                </h1>
            }

            {
                Object.keys(quantities).length === 0 ? (
                    <p className="lg:text-3xl md:text-2xl sm:text-xs Poppins py-4 text-center m-[auto] ">Your cart is empty.</p>
                ) : (
                    <div className="border border-gray-300 p-4  overflow-x-auto">
                        <table className="w-full border-collapse border ">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border">Item</th>
                                    <th className="py-2 px-4 border">Quantity</th>
                                    <th className="py-2 px-4 border">Price</th>
                                    <th className="py-2 px-4 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(quantities).map(([itemId, { quantity, dishName, price }]) => (
                                    <tr key={itemId}>
                                        <td className="py-4 px-4 border font-medium">{`${dishName} `}</td>
                                        <td className="py-4 px-4 border">{quantity === 0 ? 'Add' : quantity}</td>
                                        <td className="py-4 px-4 border"> &#8377; {price}</td>
                                        <td onClick={() => handleDelete(itemId)} className="py-2 px-4 border cursor-pointer  hover:text-red-500 ">Delete</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-8 sm:block  ">
                            <p className="font-semibold">Total Items: {totalItems}</p>
                            <p className="font-semibold">Total Price: &#x20b9;{TotalPrice}</p>
                        </div>

                        <button className="mt-8 bg-[#ffcc00]    hover:bg-[#ffcc00cf] text-black font-bold py-2 px-4      rounded">
                            <Link to="/payment">
                                Proceed to Checkout
                            </Link>

                        </button>
                    </div>
                )}
        </div>
    );
};

export default CartPage;
