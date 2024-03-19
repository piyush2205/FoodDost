import React from 'react'
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { convertSlugToTitle } from './Services/SlugServices';
function Breadcrum() {
    console.log(useLocation().pathname)
    console.log(useLocation())
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    let breadcrumPath = '';
    console.log(pathnames)
    return (
        <div className='flex lg:w-[1240px] sm:w-80 md:w-[700px] m-auto text-[#ae9533] border px-2 py-2'   >
            <ol className='flex'>
                <li>
                    <Link to="/">Home</Link>
                </li>

                {
                    pathnames.map((name, index) => {

                        breadcrumPath += `${name}`;
                        const isLast = index === pathnames.length - 1;

                        return isLast ? <li key={name} > /{name} </li> : <li key={name} > <Link to={`/${breadcrumPath}`}> /{convertSlugToTitle(name)}</Link> </li>
                    })
                }
            </ol>

        </div >
    )
}

export default Breadcrum