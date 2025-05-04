import React from 'react'
import noCart from '../../assets/imgs/visuals/Empty Box.png'
import { Link } from 'react-router-dom'


function Emptycart() {
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
                    <img src={noCart} className=' w-80 mb-4' />
                    <h2 className=' text-2xl mb-4'>your cart is feeling kinda light</h2>
                    <h2 className=' font-normal text-xl blackMuted70 mb-4'>add something special to make it feel complete</h2>
                    <Link to='/' className=" button4 relative flex justify-center justify-items-center">

                        <div class="arrow-wrapper-four  ">
                        <span className='  font-normal'>start shopping</span>
                            <div class="arrow-four ms-2"></div>

                        </div>

                    </Link>
                </div>
            </div>

        </>
    )
}

export default Emptycart
