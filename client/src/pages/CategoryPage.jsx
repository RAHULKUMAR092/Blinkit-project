import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false)
    const [loading, setLoading] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const fetchCategory = async () => {
        try {
            setLoading(true)
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <section>
            <div className='p-2 bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-semibold'>Category</h2>
                <button onClick={() => setOpenUploadCategory(true)}
                    className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add category</button>
            </div>
            {
                !categoryData[0] && !loading && (
                    <NoData />
                )
            }

            {
                loading && (
                    <Loading />
                )
            }


            {
                openUploadCategory && (
                    <UploadCategoryModel close={() => setOpenUploadCategory(false)} />
                )
            }
        </section>
    )
}

export default CategoryPage
