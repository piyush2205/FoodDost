// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { memo } from 'react';
import link from "../../Assets/Link.png"

const CardComponent = memo(({ ...el }) => {
    // console.log(el)
    // console.log(props.match)
    // const { restaurantName } = el.name;
    // console.log(restaurantName)
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



            <div className=" border rounded-md w-[350px] h-[416px] bg-white ">

                <img className=' w-[328px] h-[248px] m-[auto] mt-[10px] ' src={link} alt="Shoes" />

                <div className="p-4  w-[328px] m-[auto] flex flex-col gap-[5px] border-blue-700" >
                    <div className="flex gap-2 ">
                        <h2 className="text-[17px]  text-left whitespace-nowrap overflow-hidden text-ellipsis w-52 ">{el.name}</h2>
                        <div className="inline-flex items-center  rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">NEW</div>
                        <div className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Declicious</div>
                        <div className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{el.rating} </div>
                    </div>

                    <div className="flex items-center gap-2 text-[14px]">
                        <p className='whitespace-nowrap overflow-hidden text-ellipsis w-52  font-light  text-[#696969]'>{(menuData).join(", ")}</p>
                        <div className="inline-flex items-center rounded-md bg-red-50 px-1 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20"> 	&#8377;{el.priceRange} for two </div>
                    </div>

                    <div className="flex items-center gap-2 text-[14px]">
                        <p className='whitespace-nowrap overflow-hidden text-ellipsis w-52  font-light text-[13px]  text-[#9C9C9C]'>{el.restaurantAddress.city},{el.restaurantAddress.state}</p>
                        <div className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20"> 	&#8377;{Math.floor(Math.random() * 50)} km</div>
                    </div>


                    {/* <div className="gap-10 flex py-2">
                        <div className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Tasty</div>
                        <div className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Declicious</div>
                        <div className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{el.rating} </div>
                      </div> */}




                    <div className="flex items-center justify-between mt-1">
                        <Link to={`/Cart`} className=" rounded-full text-sm font-semibold  bg-[#F2C14E] leading-6 text-gray-900 hover:bg-[#ad904e] px-3 py-1 "> Your Cart <span aria-hidden="true">→</span></Link>
                        <Link to={`/Gorakhpur/${el._id}`} className="rounded-full bg-[#267E3E] px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-[#56a26a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Order Now  <span aria-hidden="true">→</span></Link>

                    </div>

                </div>
            </div >
        </>

    )
})

export default CardComponent