// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



function CardComponent({ ...el }) {
    // console.log(el)
    const [resData, setresData] = useState([])
    const [menuData, setMenuData] = useState([])

    useEffect(() => {
        setresData(el)
        menu()
    }, [])

    // console.log(resData)
    const menu = () => {
        setMenuData(el.menu.items.map((items) => (items.name)
        ))
    }

    // console.log(menuData)
    return (

        <>



            <div className=" w-88  border-2 shadow-xl  shadow-outline  ">
                <figure><img className='w-full' src="https://th.bing.com/th/id/OIP.QuUTQeb-TCUWgMOu27vgRAHaE7?w=262&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Shoes" /></figure>
                <div className="p-4" >
                    <div className="flex gap-2 py-2">
                        <h2 className="text-2xl">{el.name}  </h2>
                        <div className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">NEW</div>

                    </div>

                    <div className="flex items-center py-2 gap-2">
                        <p className=''>{(menuData).join(", ")}</p>


                    </div>


                    <div className="gap-10 flex py-2">
                        <div className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Tasty</div>
                        <div className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Declicious</div>
                        <div className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{el.rating} </div>

                    </div>

                    <div className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20"> 	&#8377;{el.priceRange} for one </div>
                    <div className="flex items-center justify-between py-2 mt-4">
                        <Link to={`/orderNow/${el._id}`} className="rounded-md bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Order Now</Link>
                        <Link to={`/SingleComponet/${el._id}`} className=" rounded-md text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 px-3.5 py-2.5 "> View All <span aria-hidden="true">→</span></Link>
                    </div>
                </div>
            </div >
        </>

    )
}

export default CardComponent