import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='border-t'>
            <div className='container mx-auto p-4'>
                <p>© All Right Reserved 2025</p>
                <div>
                    <a href='#'>
                        <FaFacebook />
                    </a>
                    <a href='#'>
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
