import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../Css/SingleComponent.css"

function SingleComponet() {

    const [AllData, setData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const fetchdata = async () =>
            await axios.get(`http://localhost:2223/foodapidata/singleData/${id}`).then((res) => {

                setData(res.data)
            }).catch((err) => {

                console.log(err)
            })

        fetchdata()
    }, [id])

    console.log(AllData)
    return (
        <div >
            <section >
                <div className='Image-gallary '   >

                    <div className='image-display-1 border  '>
                        {/* <img src={`${Img}`} className='img1' ></img> */}
                    </div>
                    <div className='wrapper '>
                        <div className='image-display-2 border ' >img2</div>
                        <div className='image-display-3 border  '>img3</div>
                    </div>

                    <div className='image-display-4 border '>img4</div>
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
                        {/* {AllData.restaurantAddress.street},
                        {
                            AllData.restaurantAddress.city
                        }
                         */}

                        {AllData.restaurantAddress && (
                            <>
                                {AllData.restaurantAddress.street},
                                {AllData.restaurantAddress.city}
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
                        {/* {AllData.deliveryTimings.open}-{
                            AllData.deliveryTimings.close
                        } */}
                    </p>
                </div>

            </section>
        </div>
    );

}

export default SingleComponet