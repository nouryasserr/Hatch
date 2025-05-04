import React from 'react'
import noWishList from '../../assets/imgs/visuals/Empty Folder.png'
import { Link } from 'react-router-dom'

function EmptyWishlist() {
    return (
        <>
                    <div className=" mx-6 my-6 p-6">
        
                        <Link to='/' className=" button3 relative flex justify-end justify-items-end">
        
                            <div class="arrow-wrapper-three  absolute">
                                <div class="arrow-three"></div>
                                <span className=' ms-2 font-normal'>back</span>
        
                            </div>
        
                        </Link>
        
                        <div className=' justify-items-center'>
                            <img src={noWishList} className=' w-80 mb-4' />
                            <h2 className=' text-2xl mb-4'>nothing’s caught your eye yet ?</h2>
                            <h2 className=' font-normal text-xl blackMuted70 mb-4'>
                                save the pieces you love – they'll be waiting when you come back
                            </h2>
                            <Link to='/' className=" button4 relative flex justify-center justify-items-center">
        
                                <div class="arrow-wrapper-four  ">
                                <span className='  font-normal'>browse collections</span>
                                    <div class="arrow-four ms-2"></div>
        
                                </div>
        
                            </Link>
                        </div>
                    </div>
        </>
    )
}

export default EmptyWishlist
