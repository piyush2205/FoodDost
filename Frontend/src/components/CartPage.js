import React from 'react'


import { useCart } from './CartContext';
import Breadcrum from './Breadcrum';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { quantities, totalItems, TotalPrice, removeFromCart } = useCart();
    console.log(TotalPrice, quantities, totalItems,)
    const handleDelete = (itemId) => {
        removeFromCart(itemId)
    }

    return (
        <div className="container mx-auto w-[1240px] mt-10">
            <Breadcrum />
            <h1 className="text-3xl font-semibold mb-8"> Your Food Court</h1>
            <h1>
                Restaurant Name:{' Restaurant Name'}
            </h1>

            {Object.keys(quantities).length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="border border-gray-300 p-4">
                    <table className="w-full border-collapse border">
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

                    <div className="mt-8">
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
