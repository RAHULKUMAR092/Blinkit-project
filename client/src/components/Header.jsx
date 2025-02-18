import React from 'react'
import logo from "../assets/logo.png"
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux'

const Header = () => {
    const [isMobile] = useMobile();
    const location = useLocation();
    const isSearchPage = location.pathname === '/search';
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);

    const redirectToLoginPage = () => {
        navigate('/login')
    }

    return (
        <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 flex items-center flex-col justify-center gap-1 bg-white'>
            {
                !(isSearchPage && isMobile) && (
                    <div className='container mx-auto flex items-center px-2 justify-between'>
                        {/* logo */}
                        <div className='h-full'>
                            <Link to={"/"} className='flex items-center justify-center h-full'>
                                <img src={logo}
                                    alt="Logo"
                                    width={170}
                                    height={60}
                                    className='hidden lg:block'
                                />
                                <img src={logo}
                                    alt="Logo"
                                    width={120}
                                    height={60}
                                    className='lg:hidden'
                                />
                            </Link>
                        </div>

                        {/* Search  */}
                        <div className='hidden lg:block '>
                            <Search />
                        </div>

                        {/* login and my card  */}
                        <div className=''>
                            {/* user icons display in only mobile version  */}
                            <button className='text-neutral-600 lg:hidden'>
                                <FaRegCircleUser size={26} />
                            </button>
                            {/* user icons display in only Desktop version  */}
                            <div className='hidden lg:flex items-center gap-10'>
                                <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
                                <button className='flex items-center gap-2 bg-green-800 hover:bg-gray-700 px-3 py-3 rounded text-white'>
                                    <div className='animate-bounce'>
                                        {/* add to card icons  */}
                                        <BsCart4 size={28} />
                                    </div>
                                    <div className='font-semibold'>
                                        <p>My Cart</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className='container mx-auto px-2 lg:hidden'>
                <Search />
            </div>
        </header>
    )
}

export default Header
