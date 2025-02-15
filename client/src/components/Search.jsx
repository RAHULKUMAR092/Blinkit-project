import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';



const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)
    const [isMobile] = useMobile()


    useEffect(() => {
        const isSearch = location.pathname === '/search'
        setIsSearchPage(isSearch)

    }, [location])

    const redirectToSearchPage = () => {
        navigate('/search')
    }
    return (
        <div className='w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500
         bg-slate-50 group focus-within:border-primary-200'>
            <div>

                {
                    (isMobile && isSearchPage) ? (
                        <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md'>
                            <FaArrowLeft size={22} />
                        </Link>
                    ) : (
                        <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200'>
                            <IoSearch size={22} />
                        </button>
                    )
                }

            </div>
            <div className='w-full h-full'>
                {
                    !isSearchPage ? (
                        // not in search page
                        <div onClick={redirectToSearchPage} className='w-full h-full flex items-center' >
                            <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'Search "Milk"',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'Search "bread"',
                                    1000,
                                    'Search "Sugar"',
                                    1000,
                                    'Search "Panner"',
                                    1000,
                                    'Search "chocolate"',
                                    1000,
                                    'Search "Curd"',
                                    1000,
                                    'Search "Rice"',
                                    1000,
                                    'Search "Chips"',
                                    1000,
                                    'Search "Oil"',
                                    1000,
                                    'Search "Atta"',
                                    1000
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </div>
                    ) : (
                        // in search page
                        <div className='w-full h-full'>
                            <input type="text"
                                placeholder="Search for products"
                                autoFocus
                                className='bg-transparent w-full h-full outline-none'
                            />
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Search
