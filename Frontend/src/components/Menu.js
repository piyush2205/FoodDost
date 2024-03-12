import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from './CartContext';
import Breadcrum from './Breadcrum';

function Menu() {
    const { quantities, addToCart, totalItems, removeFromCart } = useCart();
    const [AllData, setData] = useState([])
    const { id } = useParams()
    // const [value, setvalue] = useState(1)
    window.scroll(0, 0)
    useEffect(() => {
        const fetchdata = async () =>
            await axios.get(`http://localhost:2223/foodapidata/singleData/${id}`).then((res) => {

                setData(res.data)
            }).catch((err) => {

                console.log(err)
            })

        fetchdata()
    }, [])

    // console.log(AllData)

    const handleIncDec = (itemId, action, dishName) => {
        const restaurantId = AllData.id;
        const price = AllData.menu.items.find(item => item.itemId === itemId)?.price || 0;
        // Ensure quantity is a positive integer
        let quantityChange = action === 'increment' ? 1 : -1;
        const currentQuantity = quantities[itemId]?.quantity || 0;

        // If the operation would make the quantity negative, set quantityChange to make it 0
        if (currentQuantity + quantityChange <= 0) {
            removeFromCart(itemId);
            return;
        }

        addToCart(price, restaurantId, itemId, quantityChange, dishName);
    };

    return (

        <section className='mt-10 '>
            <div className=' w-[1240px] m-auto '>
                <Breadcrum />
                <h1 className='font-semibold text-4xl antialiased mt-10 mb-10 '>
                    MENU
                    {/* <select name="category" >
                        <option value="0">Menu</option>
                        <option value="1">Rice Bowls</option>
                        <option value="2">Value Meals</option>
                        <option value="3">Desserts</option>
                    </select> */}
                </h1>
                <h1 className='font-semibold text-4xl antialiased mt-10 mb-10 '>
                    {AllData.name}
                </h1>
                <p className="text-2xl antialiased font-semibold py-2">
                    {AllData.foodCategory && (AllData.foodCategory).join(",")}
                </p>

                {AllData.menu?.items.map((el, i) => {
                    return (
                        <>
                            <div className="flex justify-between  border-b py-4 " key={i}>
                                <p className="text-2xl antialiased">
                                    {el.name} - &#8377;{el.price}
                                </p>
                                <div className="flex gap-5 mt-5 " >
                                    <button className=' border border-[#ffcc00]  w-10 h-8' onClick={() => handleIncDec(el.itemId, 'decrement', el.name)} disabled={quantities[el.itemId]?.quantity <= 0}>-</button>
                                    {quantities[el.itemId]?.quantity > 0 ? (
                                        quantities[el.itemId]?.quantity
                                    ) : (
                                        <span onClick={() => handleIncDec(el.itemId, 'increment', el.name)}>Add</span>
                                    )}

                                    <button className='border border-[#ffcc00]  w-10 h-8 ' onClick={() => handleIncDec(el.itemId, 'increment', el.name)} disabled={quantities[el.itemId]?.quantity >= 10}>+</button>
                                </div >

                            </div>
                        </>
                    )
                })},

                <div className='flex border-t  p-2 content-center items-center justify-between mt-10'>
                    <h1 className="text-xl antialiased " >Total price : &#8377;{AllData.menu?.items.reduce((acc, el) => acc + (quantities[el.itemId]?.quantity || 0) * el.price, 0)}</h1>
                    <button>
                        <Link to="/payment">
                            <button className='ml-10 bg-[#ffcc00] hover:bg-[#ffcc00cf]  w-40 h-12 text-center rounded text-[18px] font-semibold  ' disabled={totalItems === 0} >Order Now</button>
                        </Link>
                    </button>
                </div>


            </div >
        </section >

    )
}

export default Menu