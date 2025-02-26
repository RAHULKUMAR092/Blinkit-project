import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import DisplayTable from '../components/DisplayTable';
import { createColumnHelper } from '@tanstack/react-table';
import ViewImage from '../components/ViewImage';
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import EditSubCategory from '../components/EditSubCategory';





const SubCategoryPage = () => {
    const [opneAddSubCategory, setOpenAddSubCategory] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const columnHelper = createColumnHelper()
    const [ImageURL, setImageURL] = useState("");
    const [opneEdit, setOpenEdit] = useState(false);
    const [editDate, setEditDate] = useState({
        id: "",
    });


    const fetchCategory = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getSubCategory
            })
            const { data: responseData } = response;
            if (responseData.success) {
                setData(responseData.data);
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategory();
    }, [])
    const column = [
        columnHelper.accessor('name', {
            header: "Name"
        }),
        columnHelper.accessor('image', {
            header: "Image",
            cell: ({ row }) => {
                return <div className='flex justify-center items-center'>
                    <img
                        src={row.original.image}
                        alt={row.original.name}
                        className='w-8 h-8 cursor-pointer'
                        onClick={() => {
                            setImageURL(row.original.image)
                        }}
                    />
                </div>
            }
        }),
        columnHelper.accessor("category", {
            header: "Category",
            cell: (({ row }) => {
                return (
                    <>
                        {
                            row.original.category.map((c, index) => {
                                return (
                                    <p key={c._id + "table"} className='shadow-md px-1 inline-block'>{c.name}</p>
                                )
                            })
                        }
                    </>
                )
            })
        }),
        columnHelper.accessor("_id", {
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className='flex items-center justify-center gap-3'>
                        <button onClick={() => {
                            setOpenEdit(true)
                            setEditDate(row.original)
                        }}
                            className='p-2 bg-green-100 rounded-full hover:text-green-600'>
                            <HiPencil size={20} />
                        </button>
                        <button className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600'>
                            <MdDelete size={20} />
                        </button>
                    </div>
                )
            }
        })
    ]

    return (
        <section>
            <div className='p-2 bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-semibold'>Sub Category</h2>
                <button onClick={() => setOpenAddSubCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub Category</button>
            </div>

            <div>
                <DisplayTable
                    data={data}
                    column={column}
                />
            </div>

            {
                opneAddSubCategory && (
                    <UploadSubCategoryModel close={() => setOpenAddSubCategory(false)} />
                )
            }
            {
                ImageURL &&
                <ViewImage url={ImageURL} close={() => setImageURL("")} />
            }
            {
                opneEdit &&
                <EditSubCategory
                    data={editDate}
                    close={() => setOpenEdit(false)}
                    fetchData={fetchCategory}
                />
            }
        </section >
    )
}

export default SubCategoryPage
