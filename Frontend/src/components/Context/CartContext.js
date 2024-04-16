// CartContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Import axios if it's not imported

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

const CustomConfirm = ({ message, onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
                <div className="mb-4">
                    <p>{message}</p>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export const CartProvider = ({ children }) => {
    const [currentRestaurantId, setCurrentRestaurantId] = useState(
        JSON.parse(localStorage.getItem('currentRestaurantId')) || null
    );
    const [TotalPrice, setPrice] = useState(() => {
        const savedPrice = localStorage.getItem('Price');
        return savedPrice ? JSON.parse(savedPrice) : 0;
    });
    const [restaurantName, setRestaurantName] = useState("");
    const [quantities, setQuantities] = useState(() => JSON.parse(localStorage.getItem('cart')) || {});
    const [confirmationData, setConfirmationData] = useState({
        restaurantId: null,
        restaurantName: null,
        itemId: null,
        quantity: null,
        price: 0,
        dishName: null,
    });
    const resetCart = () => {
        setCurrentRestaurantId(null);
        setPrice(0);
        setRestaurantName("");
        setQuantities({});
    };
    const closeConfirmationModal = () => {
        setConfirmationData({
            restaurantId: null,
            restaurantName: null,
            itemId: null,
            quantity: null,
            price: 0,
            dishName: null,
        });
    };

    useEffect(() => {
        // Save cart data and current restaurant ID to local storage whenever they change
        // console.log('Updating local storage:', { TotalPrice, quantities, currentRestaurantId, restaurantName });
        localStorage.setItem('Price', JSON.stringify(TotalPrice));
        localStorage.setItem('restaurantName', JSON.stringify(restaurantName));
        localStorage.setItem('cart', JSON.stringify(quantities));
        localStorage.setItem('currentRestaurantId', JSON.stringify(currentRestaurantId));
    }, [quantities, currentRestaurantId, TotalPrice, restaurantName]);


    const confirmAction = () => {
        const { restaurantId, itemId, quantity, price, dishName, restaurantName } = confirmationData;

        if (currentRestaurantId && currentRestaurantId !== restaurantId && Object.keys(quantities).length > 0) {
            setQuantities({ [itemId]: { quantity, dishName, price, restaurantName } });
            setPrice(price * quantity);
            setCurrentRestaurantId(restaurantId);
            setRestaurantName(restaurantName);
        } else {
            if (!currentRestaurantId) {
                setCurrentRestaurantId(restaurantId);
                setQuantities({ [itemId]: { quantity, dishName, price, restaurantName } });
                setPrice(price * quantity);
                setRestaurantName(restaurantName);
            } else {
                setQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [itemId]: {
                        quantity: (prevQuantities[itemId]?.quantity || 0) + quantity,
                        dishName: dishName,
                        price: prevQuantities[itemId]?.price || price,
                        restaurantName: prevQuantities[itemId]?.restaurantName || restaurantName
                    },
                }));
                setPrice((prevPrice) => prevPrice + price * quantity);
                setRestaurantName(restaurantName);
            }
        }

        closeConfirmationModal();
    };


    const addToCart = (price, restaurantId, itemId, quantity, dishName, restaurantName) => {
        // console.log("quantity", quantity)
        // Check if the item is already in the cart
        if (currentRestaurantId && currentRestaurantId !== restaurantId && Object.keys(quantities).length > 0) {
            // Show the confirmation popup
            // console.log(currentRestaurantId, restaurantId, itemId, quantity, price, dishName, restaurantName)
            const confirmationData = { restaurantId, itemId, quantity, price, dishName };
            setConfirmationData(confirmationData);
            setRestaurantName(restaurantName);
        } else {
            // Proceed to add the item to the cart
            if (!currentRestaurantId) {
                setCurrentRestaurantId(restaurantId);
                // setQuantities({ [itemId]: { quantity, dishName, price, restaurantName } });
            }

            setPrice((prevPrice) => prevPrice + price * quantity);
            setRestaurantName(restaurantName);
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [itemId]: {
                    quantity: (prevQuantities[itemId]?.quantity || 0) + quantity,
                    dishName: dishName,
                    price: price,
                    restaurantName: restaurantName
                },
            }));

            // Reset confirmationData to its initial state
            closeConfirmationModal();
        }
    };



    const removeFromCart = (itemId, price) => {
        // console.log("remove from cart", itemId, price)
        // Remove the item from the cart

        // setQuantities((currentQuantities) => {
        //     const newQuantities = { ...currentQuantities };
        //     const itemQuantity = newQuantities[itemId]?.quantity || 0;

        //     if (itemQuantity > 0) {
        //         const itemPrice = newQuantities[itemId]?.price || 0;
        //         const itemTotalPrice = itemQuantity * itemPrice;
        //         setPrice((prevPrice) => prevPrice - itemTotalPrice);

        //     }



        //     delete newQuantities[itemId];
        //     return newQuantities;

        // });

        const newQuantities = { ...quantities };
        const itemPrice = newQuantities[itemId]?.price || 0;
        const itemQuantity = newQuantities[itemId]?.quantity || 0;
        delete newQuantities[itemId];

        if (Object.keys(newQuantities).length === 0) {
            resetCart(); // Resets everything if cart is empty after removal
        } else {
            setQuantities(newQuantities);
            setPrice(prevPrice => prevPrice - (itemPrice * itemQuantity));
        }
    };


    const totalItems = Object.values(quantities).reduce((acc, curr) => acc + curr.quantity, 0);
    // console.log(Object.values(quantities).reduce((acc, curr) => curr));

    // console.log(TotalPrice, "total price")
    // console.log(restaurantName, "restaurant name")

    // const totalItems = Object.values(quantities).reduce((acc, curr) => acc + curr.quantity, 0);

    return (
        <div>
            {/* Your application content */}
            <CartContext.Provider value={{ quantities, addToCart, totalItems, TotalPrice, removeFromCart, restaurantName }}>
                {children}
            </CartContext.Provider>
            {confirmationData.restaurantId && (
                <CustomConfirm
                    message="Your cart contains items from another restaurant. Would you like to clear your cart and add items from this restaurant?"
                    onCancel={closeConfirmationModal}
                    onConfirm={confirmAction}
                />
            )}
        </div>
    );
};


