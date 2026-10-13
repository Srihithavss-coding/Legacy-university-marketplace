import React from 'react'
import { useAppContext } from '../context/AppContext'

const Profile = () => {
    const { user, setShowUserLogin, navigate } = useAppContext()

    if (!user) {
        return (
            <div className='mt-16 flex flex-col items-start gap-4'>
                <p className='text-2xl font-medium'>Your profile</p>
                <p className='text-gray-500'>Log in with your university email to see your campus details.</p>
                <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                    Login
                </button>
            </div>
        )
    }

    const fields = [
        { label: 'Full name', value: user.name },
        { label: 'University email', value: user.email },
        { label: 'Campus / Hostel', value: user.campus, verified: true },
        { label: 'Academic department', value: user.department },
    ]

    return (
        <div className='mt-16 flex flex-col mb-16'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium uppercase'>My Profile</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>

            <div className='mt-8 max-w-xl w-full border border-gray-200 rounded-xl p-6 md:p-8 bg-white shadow-sm'>
                <div className='flex items-start justify-between gap-4'>
                    <div>
                        <p className='text-xl font-semibold text-gray-800'>{user.name}</p>
                        <p className='text-sm text-gray-500 mt-1'>{user.email}</p>
                    </div>
                    {user.campus && (
                        <span className='shrink-0 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary'>
                            Campus verified
                        </span>
                    )}
                </div>

                <div className='mt-8 grid gap-5'>
                    {fields.map((field) => (
                        <div key={field.label} className='border-b border-gray-100 pb-4 last:border-0 last:pb-0'>
                            <p className='text-xs uppercase tracking-wide text-gray-400'>{field.label}</p>
                            <p className='mt-1 text-gray-800 font-medium'>
                                {field.value || 'Not set'}
                            </p>
                            {field.verified && field.value && (
                                <p className='text-xs text-primary mt-1'>Verified campus / hostel location for peer meetups.</p>
                            )}
                        </div>
                    ))}
                </div>

                <button onClick={() => navigate('/my-orders')} className="mt-6 cursor-pointer px-6 py-2.5 bg-primary hover:bg-primary-dull transition text-white rounded-md">
                    View my orders
                </button>
            </div>
        </div>
    )
}

export default Profile
