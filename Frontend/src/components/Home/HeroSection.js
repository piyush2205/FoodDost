import React from 'react'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import sideImg from "../../Assets/sideImg.png"
import heroImage from "../../Assets/heroImage.png"
import imgCategory from "../../Assets/imgCategory.png"
import imgCategory2 from "../../Assets/imgCategory-2.png"
import imgCategory3 from "../../Assets/imgCategory-3.png"
import imgCategory4 from "../../Assets/imgCategory-4.png"
import imgCategory5 from "../../Assets/imgCategory-5.png"
import FeaturedDishes from "../../Assets/FeaturedDishes.png"
import quoteImg from "../../Assets/quoteImg.png"
import SlideRightImage from "../../Assets/SlideRightImage.png"
import { Link } from 'react-router-dom'
import "./HeroSection.css"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import _ from 'lodash';
function HeroSection() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchContainerRef = useRef(null);

    useEffect(() => {
        const debouncedSearch = _.debounce(() => {
            if (searchTerm) {
                fetchResults();
            } else {
                setResults([]);
            }
        }, 300);

        debouncedSearch();

        // Cleanup debounce
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm]);

    const fetchResults = async () => {
        try {
            const response = await axios.get(`https://fooddost.onrender.com/foodapidata/search?q=${encodeURIComponent(searchTerm)}`);
            setResults(response.data);
            setShowResults(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }
    const handleSearchClick = (id) => {
        console.log(id, "myid")
        setSearchTerm("")
        setInterval(() => {
            window.location.reload()
        }, 100)
    }
    return (
        <>
            {/* Search bar */}

            <div className='lg:hidden  md:hidden sm:hidden  mt-5 ' >
                <div className='relative w-[390px] m-[auto]'>
                    <input placeholder='Search' value={searchTerm} type="text"
                        onChange={handleSearch} onClick={() => setShowResults(true)} className=' sm:h-10 sm:w-full  h-[40px] ml-4 w-[380px] border border-[#E0E0E0] rounded-lg p-1  ' />
                    {/* {<FaSearch className=' search_icons absolute top-[13px] bottom-[0px] right-[15px] stroke-[#828282] ' />} */}
                </div>


                {
                    searchTerm && <button onClick={() => setSearchTerm("")} className='absolute top-[-287px] bottom-[358px] left-[830px] ' >X</button>

                }

                {
                    results.length > 0 && <div ref={searchContainerRef} className='absolute top-15 left-57 w-[25%] h-[auto] p-2 bg-white shadow-md overflow-y-scroll '>
                        {
                            <ul>
                                {
                                    results.map((result) => (
                                        <Link to={`Gorakhpur/${result._id}`}
                                            onClick={handleSearchClick}
                                        // Clear the search term on click

                                        >
                                            <li key={result._id} className='flex items-center border p-2 gap-2 cursor-pointer '>


                                                <img src="https://via.placeholder.com/150" alt="restaurant" style={{ width: '100px', height: '100px' }} />
                                                <div>
                                                    <h2 className='font-bold'>{result.name}</h2>
                                                    <p>Delivery Time: {result.deliveryTimings.open} - {result.deliveryTimings.close}</p>
                                                    <p>Rating: {result.rating}</p>
                                                    <p>Cost For Two: {result.priceRange} /-</p>

                                                    <p>Address: {result.restaurantAddress.street}</p>
                                                </div>
                                            </li>
                                        </Link >
                                    ))
                                }
                            </ul >
                        }
                    </div >
                }
            </div >
            {/* Search bar */}
            {/* ...............................hero section............................................................................... */}
            <div className='heroSection-1  bg-cover  bg-opacity-80  bg-no-repeat  lg:flex md:flex sm:block' style={{ margin: "auto" }} >
                <img src={sideImg} className='absolute z-[-1] w-[500px] left-[-300px] top-[150px] leftimage-1' />
                {/* <img src={sideImg} className='absolute z-[-1] w-[500px] left-[-300px] top-[1400px] leftimage-2' /> */}
                {/* <img src={SlideRightImage} className='absolute z-[-1] w-[200px] right-[-0px] top-[660px] rightimage-1' /> */}
                <img src={SlideRightImage} className='absolute z-[-1] w-[200px] right-[-0px] top-[2090px] rightimage-2' />
                <img src={sideImg} className='absolute z-[-1] w-[500px] left-[-300px] top-[2960px] leftimage-3' />
                <div className='w-[67%] h-[429px] mt-20 text-left heroSubSection-1 '>

                    <h1 className='text-6xl leading-[80px] main-heading heroSection-1-main_heading-desktop' >Savor the  <span className='hero-section-heading-1 '>Flavor</span> <span className='hero-section-heading-2 '>full</span>  Journey with Your Culinary Companion!</h1>

                    {/* mobile res */}
                    <h1 className='text-6xl leading-[80px] main-heading heroSection-1-main_heading  ' >Savor the  <br /><span className='hero-section-heading-1  heroSection-1-main_span_heading'>Flavor</span> <span className='hero-section-heading-2 heroSection-1-main_span_heading'>full</span> <br /> Journey with Your Culinary Companion!</h1>

                    <div className='w-[33%] h-[429px]    mt-[30px] mb-[20px] content-center hero_image-mobile'>
                        <img className='w-[90%]  main-herosection-image  hero-image-mobile-main-image' src={heroImage} />
                    </div>
                    <p className='text-xl mt-[25px] w-[438px] heroSection-1-subheading_2  '>Discover the Art of <span className='text-[#ED4949]'>Cooking</span> with Expert Tips and Gourmet Recipes!</p>

                    {/* ................................................................... */}


                    <p className='text-xl mt-[25px] w-[438px] heroSection-1-subheading_2_desktop   '>Discover the Art of <span className='text-[#ED4949]'>Cooking</span> with Expert Tips and Gourmet Recipes!</p>


                    <Link to={"/Gorakhpur"} >   <button className='bg-[#4B2E2B]  hover:bg-[#543d3d]   main-heading-button justify-center items-center flex mt-[40px] rounded-full w-[150px] h-[50px] text-white  '><span className="mr-0">Order now</span>
                        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.70166 14.0447L13.5283 5.7832M13.5283 5.7832H6.48433M13.5283 5.7832V13.2185" stroke="white" stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>  </Link>


                </div>
                <div className='w-[33%] h-[429px]   mt-20 content-center flex items-end hero_image-desktop'>
                    <img className='w-[100%]   hero_image-desktop-animation  ' src={heroImage} />
                </div>


            </div >



            {/* .....................................................................others section.................................................................. */}


            <div className='lg:w-[1080px] h-[auto]  m-auto main-Section-second '>

                <div className=' lg:w-[1080px] section-2-desktop h-auto '>
                    <h1 className='font-semibold text-6xl antialiased text-center  '> <span className='text-[#ED4949]'>Popular</span> Categories</h1>
                    <p className='font-semibold text-2xl antialiased text-center mt-4 '>Explore Our Most <span className='text-[#ED4949]'>Loved</span> Cuisines</p>
                    <div className='flex flex-wrap gap-12 p-8 rounded-[30px] mt-14 mb-14 place-content-center align-middle content-center w-full m-auto main-section-second-image-div ' style={{ backgroundColor: "rgba(75, 46, 43, 0.16)" }}>
                        <Link to={"/Gorakhpur"}>
                            <img src={imgCategory} className='h-[150px]' />
                        </Link>
                        <Link to={"/Gorakhpur"}>
                            <img src={imgCategory2} className='h-[150px]' />
                        </Link>
                        <Link to={"/Gorakhpur"}>
                            <img src={imgCategory3} className='h-[150px]' />
                        </Link>
                        <Link to={"/Gorakhpur"}>
                            <img src={imgCategory4} className='h-[150px]' />
                        </Link>
                        <Link to={"/Gorakhpur"}>
                            <img src={imgCategory5} className='h-[150px]' />
                        </Link>


                    </div>
                </div>

                {/* ...............................................mobile responsvie.................................... */}
                <div className='w-[1080px] section-2-mobile '>
                    <h1 className='font-semibold text-6xl antialiased text-center heading-main-section-2-mobile '> <span className='text-[#ED4949]'>Popular</span> Categories</h1>
                    <p className='font-semibold text-2xl antialiased text-center mt-4  sub-heading-section-2-mobile  '>Explore Our Most <span className='text-[#ED4949]'>Loved</span> Cuisines</p>
                    {/* <div className='circle-layout' style={{ backgroundColor: "rgba(75, 46, 43, 0.16)" }}>
                    

                        <img src={imgCategory} alt="Dish 1" className="circle-item item-1" />
                        <img src={imgCategory} alt="Dish 2" className="circle-item item-2" />
                        <img src={imgCategory} alt="Dish 3" className="circle-item item-3" />
                        <img src={imgCategory} alt="Dish 4" className="circle-item item-4" />
                        <img src={imgCategory} alt="Dish 5" className="circle-item item-5" />

                    </div> */}
                    <div className="circle-container">
                        <div className="circle-item item1">
                            <Link to={"/Gorakhpur"}><img src={imgCategory} alt="Dish 1" /></Link>

                        </div>
                        <div className="circle-item item2">
                            <Link to={"/Gorakhpur"}>
                                <img src={imgCategory2} alt="Dish 2" />
                            </Link>

                        </div>
                        <div className="circle-item item3">
                            <Link to={"/Gorakhpur"}> <img src={imgCategory3} alt="Dish 3" /></Link>

                        </div>
                        <div className="circle-item item4">
                            <Link to={"/Gorakhpur"}> <img src={imgCategory4} alt="Dish 4" /></Link>

                        </div>
                        <div className="circle-item item5">
                            <Link to={"/Gorakhpur"}> <img src={imgCategory5} alt="Dish 5" />
                            </Link>
                        </div>
                    </div>
                </div>



                {/* /............................................................................................................. */}



                {/* ..........................next section.......................................................................... */}
                {/* <div className='  mt-[200px] flex  flex-col justify-center items-center  w-[1080px] h-[auto]'>

                    <div className=' w-[1080px]  '>
                        <h1 className='font-semibold text-6xl antialiased text-center  '> <span className='text-[#ED4949]'>Featured</span>  Dishes</h1>
                        <p className='font-semibold text-2xl antialiased text-center mt-4 '>Today's  <span className='text-[#ED4949]'> Special</span> Picks Just for You</p>

                    </div>

                    <div className='flex gap-12 p-8 rounded-[30px] border mt-[50px] place-content-center align-middle content-center w-[1080px] m-auto  items-center' >
                        <img src={FeaturedDishes} className='h-[331px] w-[255px]' />
                        <img src={FeaturedDishes} className='h-[520px]' />
                        <img src={FeaturedDishes} className='h-[331px] w-[255px]' />
                    </div>

                    <Link to={"/Gorakhpur"} >   <button className='bg-[#4B2E2B]  justify-center items-center flex mt-[40px] rounded-full w-[150px] h-[50px] text-white  '><span className="mr-0">Order now</span>
                        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.70166 14.0447L13.5283 5.7832M13.5283 5.7832H6.48433M13.5283 5.7832V13.2185" stroke="white" stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    </Link>
                </div> */}
                <div className='mt-10 md:mt-[200px] flex flex-col justify-center items-center w-full  h-auto px-4 md:px-0'>
                    <div className='w-full '>
                        <h1 className='font-semibold text-3xl md:text-6xl antialiased text-center heading-main-section-2-mobile'>
                            <span className='text-[#ED4949]'>Featured</span> Dishes
                        </h1>
                        <p className='font-semibold text-xl md:text-2xl antialiased text-center mt-4 sub-heading-section-2-mobile'>
                            Today's <span className='text-[#ED4949]'>Special</span> Picks Just for You
                        </p>
                    </div>

                    {/* Mobile Carousel */}
                    <div className='block w-full mt-10 md:mt-[50px] p-20px my-class-caraousal-mobile-view '>
                        <Carousel
                            showArrows={false}
                            infiniteLoop={true}
                            showThumbs={false}
                            showStatus={false}
                            autoPlay={true}
                            interval={3000}
                            className="rounded-[30px] border"
                        >
                            <div>
                                <img src={FeaturedDishes} className='h-[500px] w-full object-cover rounded-[30px]' alt="Featured Dish 1" />
                            </div>
                            <div>
                                <img src={FeaturedDishes} className='h-[500px] w-full object-cover rounded-[30px]' alt="Featured Dish 2" />
                            </div>
                            <div>
                                <img src={FeaturedDishes} className='h-[500px] w-full object-cover rounded-[30px]' alt="Featured Dish 3" />
                            </div>
                        </Carousel>
                    </div>

                    {/* Desktop View */}
                    <div className='md:flex flex-col md:flex-row gap-4 md:gap-12 p-4 md:p-8 rounded-[30px] border mt-10 md:mt-[50px] place-content-center align-middle content-center w-full md:w-[1080px] m-auto items-center my-slider-3rd-section-div'>
                        <img src={FeaturedDishes} className='h-[331px] w-[255px] object-cover rounded-[30px]' />
                        <img src={FeaturedDishes} className='h-[520px] object-cover rounded-[30px]' />
                        <img src={FeaturedDishes} className='h-[331px] w-[255px] object-cover rounded-[30px]' />

                    </div>

                    <Link to="/Gorakhpur">
                        <button className='bg-[#4B2E2B] justify-center items-center flex mt-10 md:mt-[40px] rounded-full w-[150px] h-[50px] text-white'>
                            <span className="mr-2">Order now</span>
                            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.70166 14.0447L13.5283 5.7832M13.5283 5.7832H6.48433M13.5283 5.7832V13.2185" stroke="white" strokeWidth="0.833333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </Link>
                </div>



                {/* ......................................................................................................................... */}

                {/* <div className='mt-[100px]   flex flex-col place-content-center items-center justify-center '>
                    <h1 className='quote text-center absolute z-1 w-[900px]'>
                        "Good food is the foundation of genuine <span className='quoteSpan'>happiness</span> ."
                    </h1>
                    <img src={quoteImg} className='w-[100%]' />
                </div> */}
                <div className="mt-[100px] flex flex-col items-center justify-center">
                    <h1 className="quote text-center absolute z-1 w-full max-w-[900px] px-4 sm:px-6 lg:px-8  ">
                        "Good food is the foundation of genuine <span className="quoteSpan">happiness</span>."
                    </h1>
                    <img src={quoteImg} className="w-full max-w-[900px] mt-10 sm:mt-12 lg:mt-16" />
                </div>


            </div>

        </>

    )
}

export default HeroSection