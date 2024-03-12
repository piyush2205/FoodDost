import React from 'react'
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';

function Breadcrum() {
    // console.log(useLocation().pathname)
    // const location = useLocation();
    // const pathnames = location.pathname.split('/').filter(x => x);
    // console.log(pathnames)
    return (
        <div className='flex w-[1240px] m-auto text-[#ae9533] border px-2 py-2'   >
            <ol>
                <li>
                    <Link to="/">Home</Link>
                </li>



            </ol>

        </div>
    )
}

export default Breadcrum