// UserProfile.js
import React, { useState } from 'react';

function UserProfilePage() {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("johndoe@example.com");
    const [orders, setOrders] = useState([
        { id: 1, name: "Pizza", quantity: 2 },
        { id: 2, name: "Burger", quantity: 1 },
        { id: 3, name: "Pasta", quantity: 3 }
    ]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    return (
        <React.Fragment>
            <div className="max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <div className="flex justify-center md:justify-end ">
                        <img className="w-20 h-20 object-cover m-[auto] rounded-full border-2  border-indigo-500" src="https://images.unsplash.com/photo-1562003389-902303a38425?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=256&h=256&q=80" alt="Profile face" />
                    </div>
                    <h1 className="text-center text-3xl font-semibold">John Doe</h1>
                    <p className="text-center text-gray-600">Food Enthusiast</p>
                    <p className="mt-2 text-center text-gray-600">Passionate about exploring new cuisines and creating delicious recipes. Join me on my food journey!</p>
                </div>
                {/* <div className="px-6 py-4 flex justify-center">
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded" onClick={() => alert("Followed!")}>Follow</button>
                </div> */}
            </div>



            <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
                {/* <div className="px-6 py-4">
                    <h1 className="text-center text-3xl font-semibold mb-4">User Profile</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                </div> */}
                <div className="px-6 py-4">
                    <h2 className="text-lg font-semibold mb-4">Order History</h2>
                    {orders.map(order => (
                        <div key={order.id} className="mb-2">
                            <span className="font-semibold">{order.name}</span> - <span>{order.quantity} items</span>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default UserProfilePage;
