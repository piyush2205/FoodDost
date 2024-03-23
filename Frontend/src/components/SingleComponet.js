import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../Css/SingleComponent.css"
import Breadcrum from './Breadcrum'

function SingleComponet() {

    const [AllData, setData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const fetchdata = async () =>
            await axios.get(`https://food-dost-api.vercel.app/foodapidata/singleData/${id}`).then((res) => {

                setData(res.data)
            }).catch((err) => {

                console.log(err)
            })

        fetchdata()
    }, [id])

    console.log(AllData)
    return (
        <div >
            <Breadcrum />
            <section >
                <div className='Image-gallary '   >

                    <div className='image-display-1   '>
                        {/* <img src={`${Img}`} className='img1' ></img> */}
                    </div>
                    <div className='wrapper '>
                        <div className='image-display-2  ' ></div>
                        <div className='image-display-3 '></div>
                    </div>

                    <div className='image-display-4 '></div>
                </div>
            </section>
            <section className='mt-10 border-2'>
                <div className=' w-[1240px] m-auto '>
                    <h1 className='font-semibold text-4xl antialiased mt-10 mb-10 '>
                        {AllData.name}
                    </h1>
                    <p className="text-2xl antialiased">
                        {(AllData.foodCategory)}
                    </p>
                    <p className=' '>


                        {AllData.restaurantAddress && (
                            <>
                                {AllData.restaurantAddress.street},
                                {AllData.restaurantAddress.city},
                                {AllData.restaurantAddress.state},

                            </>
                        )}
                    </p>
                    <p className=' '>

                        {AllData.restaurantAddress && (
                            <>
                                {AllData.deliveryTimings.open}-
                                {AllData.deliveryTimings.close}
                            </>
                        )}

                    </p>

                    <p>
                        {AllData.description}
                    </p>
                    <p>
                        {AllData.rating}
                    </p>
                    <p>
                        {AllData.price}
                    </p>
                    <p>
                        {AllData.deliveryRatings}
                    </p>
                    {
                        AllData.isVeg ? <p>veg</p> : <p>non-veg</p>
                    }
                    <div className='text-2xl flex gap-2'>
                        {

                            AllData.foodCategory?.map((el) =>

                                <p>{el},</p>

                            )

                        }
                    </div>
                    <p>
                        price: {AllData.priceRange} for two
                    </p>


                    <div className='text-2xl'>
                        {
                            AllData.menu?.items?.map((el) =>

                                <ul>

                                    <li>{el.name}</li>
                                    <li>
                                        {el.pice}
                                    </li>


                                </ul>
                            )
                        }
                    </div>
                </div>
            </section>
        </div>
    );

}

export default SingleComponet
