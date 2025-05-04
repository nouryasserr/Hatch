import React from 'react'
import connectionLost from '../../assets/imgs/visuals/Connection Lost.png'


function Nonetwork() {
    return (
        <>
            <div className=" m-6 p-6">

                <div className=' justify-items-center'>
                    <img src={connectionLost} className=' w-80 ' />
                    <h2 className=' text-2xl mb-4'>connection lost – style paused</h2>
                    <h2 className=' font-normal text-xl blackMuted70 mb-4'>
                    you’re offline right now, but we’ll be right here when you're back
                    </h2>
                </div>

            </div>
        </> 
    )
}

export default Nonetwork
