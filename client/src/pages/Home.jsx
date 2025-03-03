import React from 'react'
import banner from "../assets/banner.jpg"
import bannerMobile from "../assets/banner-mobile.jpg"
import { useSelector } from 'react-redux'


const Home = () => {
    const loadingCategory = useSelector(state => state.product.loadingCategory)
    const categoryData = useSelector(state => state.product.allCategory)



    return (
        <section className='bg-white'>
            <div className='container mx-auto'>
                <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate - pulse my-2"} `}>
                    <img
                        src={banner}
                        alt="banner"
                        className="w-full h-full hidden lg:block"
                    />
                    <img
                        src={bannerMobile}
                        alt="bannerMobile"
                        className="w-full h-full lg:hidden"
                    />
                </div>
            </div>
            <div className='container mx-auto px-4 my- grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2'>
                {
                    loadingCategory ? (
                        new Array(12).fill(null).map((c, index) => {
                            return (
                                <div className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                                    <div className='bg-blue-100 min-h-20 rounded'></div>
                                    <div className='bg-blue-100 h-8 rounded'></div>
                                </div>
                            )
                        })
                    ) : (
                        categoryData.map((cat, index) => {
                            return (
                                <div>
                                    <div>
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="w-full h-full object-scale-down"
                                        />
                                    </div>
                                </div>
                            )
                        })

                    )

                }
            </div>
        </section >
    )
}

export default Home
