import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";


const Profile = () => {
    const user = useSelector(state => state.user)
    return (
        <div>
            <div className='w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
                {
                    user.avatar ? (
                        <img
                            alt={user.name}
                            src={user.avatar}
                            className='w-full h-full'

                        />
                    ) : (

                        <FaRegUserCircle size={65} />
                    )
                }
            </div>
            <button className='text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3'>Edit</button>
        </div>
    )
}

export default Profile
