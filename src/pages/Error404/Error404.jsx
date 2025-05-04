import React from 'react'
import { Link } from 'react-router-dom'
import notFound from '../../assets/imgs/visuals/404 Error.png'

function Error404() {
    return (
        <>
            <div className=" m-6 p-6">

                <Link to='/' className=" button3 relative flex justify-end justify-items-end">

                    <div class="arrow-wrapper-three  absolute">
                        <div class="arrow-three"></div>
                        <span className=' ms-2 font-normal'>back</span>

                    </div>

                </Link>

                <div className=' justify-items-center'>
                    <img src={notFound} className=' w-80 ' />
                    <h2 className=' text-2xl mb-4'>looks like you took a wrong turn</h2>
                    <h2 className=' font-normal text-xl blackMuted70 mb-4'>
                    the page you're looking for doesn’t exist – but great finds do
                    </h2>
                    <Link to='/' className=" button4 relative flex justify-center justify-items-center">

                        <div class="arrow-wrapper-four  ">
                            <span className='  font-normal'>back home</span>
                            <div class="arrow-four ms-2"></div>

                        </div>

                    </Link>
                </div>
            </div>
        </>
    )
}

export default Error404
