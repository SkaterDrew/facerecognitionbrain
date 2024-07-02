import React from "react";
import brain from './brain.png'
import Tilt from 'react-parallax-tilt';

const Logo = () => {
    return (
        <div className='absolute top-0 left-0 ma3 w-10-ns w-20'>
            <Tilt>
                <div>
                    <img alt='Brain Logo' src={brain} className='shadow-2 br4'/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo