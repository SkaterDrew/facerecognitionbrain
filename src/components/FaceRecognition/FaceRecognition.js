import React from "react";

const FaceRecognition = ({ imageURL, boxes }) => {
    return(
        <div className='flex justify-center'>
            <div className='w-40-l w-90 relative'>
                <img className='w-100' alt='' src={imageURL} />
                
                {/* For each box obtain from Clarifai, return a box over the image */}
                {boxes.map((box, index) => {
                    return <div key={index} className='absolute ba br4 bw2 b--blue' style={box}></div>
                })}
                
            </div>
        </div>
    )
}

export default FaceRecognition