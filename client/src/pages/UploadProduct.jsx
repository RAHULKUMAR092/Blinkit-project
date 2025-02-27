import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from "../components/Loading"
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';


const UploadProduct = () => {
    const [data, setData] = useState({
        name: "",
        image: [],
        category: [],
        subCategory: [],
        unit: "",
        stock: "",
        price: "",
        discount: "",
        description: "",
        more_details: {},
    })
    const [imageLoading, setImageLoading] = useState(false);
    const [ViewImageURL, setViewImageURL] = useState("");
    const allCategory = useSelector(state => state.product.allCategory);
    const [selectCategory, setSelectCategory] = useState("");
    const [selectSubCategory, setSelectSubCategory] = useState("");
    const allSubCategory = useSelector(state => state.product.allSubCategory);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        });
    }
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        setImageLoading(true);
        const response = await uploadImage(file)
        const { data: ImageResponse } = response
        const imageUrl = ImageResponse.data.url
        setData((preve) => {
            return {
                ...preve,
                image: [...preve.image, imageUrl]
            }
        })
        setImageLoading(false);
    }
    const handleDeleteImage = async (index) => {
        data.image.splice(index, 1)
        setData((preve) => {
            return {
                ...preve,
            }
        })
    }
    const handleRemoveCategory = async (index) => {
        data.category.splice(index, 1)
        setData((preve) => {
            return {
                ...preve,
            }
        })
    }
    const handleRemoveSubCategory = async (index) => {
        data.subCategory.splice(index, 1)
        setData((preve) => {
            return {
                ...preve,
            }
        })
    }

    return (
        <section>
            <div className='p-2 bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-semibold'>Upload Product</h2>
            </div>
            <div className='grid p-4'>
                <form className='grid gap-4'>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type="text"
                            placeholder='Enter Product Name'
                            name="name"
                            id='name'
                            required
                            value={data.name}
                            onChange={handleChange}
                            className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            id='description'
                            name="description"
                            type="text"
                            placeholder='Enter Product Description'
                            required
                            multiple
                            rows={3}
                            value={data.description}
                            onChange={handleChange}
                            className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
                        />
                    </div>
                    <div>
                        <p>Image</p>
                        <div>
                            <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'>
                                <div className='text-center flex justify-center items-center flex-col'>
                                    {
                                        imageLoading ? <Loading /> : (
                                            <>
                                                <FaCloudUploadAlt size={35} />
                                                <p>Upload Image</p>
                                            </>
                                        )
                                    }
                                </div>
                                <input
                                    type="file"
                                    id="productImage"
                                    name="productImage"
                                    className='hidden'
                                    accept='image/*'
                                    onChange={handleUploadImage}
                                />
                            </label>
                            {/* display uploaded image here  */}
                            <div className='flex flex-wrap gap-4'>
                                {
                                    data.image.map((img, index) => {
                                        return (
                                            <div key={img + index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
                                                <img
                                                    src={img}
                                                    alt={img}
                                                    className='h-full w-full object-scale-down cursor-pointer'
                                                    onClick={() => setViewImageURL(img)}
                                                />
                                                <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
                                                    <MdDelete />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label>Category</label>
                        <div>
                            <select
                                value={selectCategory}
                                onChange={(e) => {
                                    const value = e.target.value
                                    const category = allCategory.find(el => el._id === value)
                                    setData((preve) => {
                                        return {
                                            ...preve,
                                            category: [...preve.category, category]
                                        }
                                    })
                                    setSelectCategory("")
                                }}
                                className='bg-blue-50 border w-full p-2 rounded'>
                                <option value={""}>Select Category</option>
                                {
                                    allCategory.map((c, index) => {
                                        return (
                                            <option key={c + index} value={c?._id}>{c.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className='flex flex-wrap gap-3'>
                                {
                                    data.category.map((c, index) => {
                                        return (
                                            <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-1'>
                                                <p>{c.name}</p>
                                                <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveCategory(index)}>
                                                    <IoClose size={20} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label>Sub Category</label>
                        <div>
                            <select
                                value={selectSubCategory}
                                onChange={(e) => {
                                    const value = e.target.value
                                    const subCategory = allSubCategory.find(el => el._id === value)
                                    setData((preve) => {
                                        return {
                                            ...preve,
                                            subCategory: [...preve.subCategory, subCategory]
                                        }
                                    })
                                    selectSubCategory("")
                                }}
                                className='bg-blue-50 border w-full p-2 rounded'>
                                <option value={""} className='text-neutral-600'>Select Sub Category</option>
                                {
                                    allSubCategory.map((c, index) => {
                                        return (
                                            <option key={c + index} value={c?._id}>{c.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className='flex flex-wrap gap-3'>
                                {
                                    data.subCategory.map((c, index) => {
                                        return (
                                            <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-1'>
                                                <p>{c.name}</p>
                                                <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveSubCategory(index)}>
                                                    <IoClose size={20} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {
                ViewImageURL && (
                    <ViewImageURL
                        url={ViewImageURL}
                        close={() => setViewImageURL("")}
                    />
                )
            }
        </section>
    )
}

export default UploadProduct
