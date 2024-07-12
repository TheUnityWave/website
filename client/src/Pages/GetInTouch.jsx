import React from 'react'
import MapComponent from '../Components/MapComponent'

export default function GetInTouch() {
    return (
        <div id='getintouch' className='flex flex-col md:px-24 px-12 py-12 font-primary'>

            <h1 className='title text-primary font-primary font-bold text-4xl'>Get in Touch</h1>

            <div className='form-map-conatiner flex flex-col md:flex-row justify-between md:gap-16 gap-8'>

                <div className="get-in-touch-form w-full h-full flex-1">
                    <form action="" className='flex flex-col gap-4 mt-8'>
                        <div className='name flex items-start md:flex-row flex-col gap-5 w-full'>
                            <label className='w-full'>
                                <p className='block mb-2 text-md font-medium text-gray-900'>First Name <br /> </p>
                                <input type="text" required placeholder='John' className='input w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' />
                            </label>
                            <label className='w-full'>
                                <p className='block mb-2 text-md font-medium text-gray-900'>Last Name <br /> </p>
                                <input type="text" required placeholder='Doe' className='input w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' />
                            </label>
                        </div>
                        <label className='w-full'>
                            <p className='block mb-2 text-md font-medium text-gray-900'>E-mail <br /> </p>
                            <input type="email" required placeholder='johndoe@gmail.com' className='input w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' />
                        </label>
                        <label className='w-full'>
                            <p className='block mb-2 text-md font-medium text-gray-900'>Message <br /> </p>
                            <textarea name="" id="" rows="5" placeholder='Message' className='input w-full h-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'></textarea>
                        </label>
                        <button className='btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition cursor-pointer'>Send</button>
                    </form>
                </div>

                <MapComponent />
            </div>
        </div>
    )
}
