import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit, input, errorMessage }) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='flex justify-center'>
                <div className='pa4 br3 shadow-5 flex flex-wrap justify-center form'>
                    <input 
                        type='text' 
                        className='f4 pa2 w-70 center' 
                        onChange={onInputChange}
                        value={input}
                        onKeyUp={event => {
                            if (event.key === 'Enter') {
                                onButtonSubmit()
                            }
                        }}
                    />
                    <button 
                        className='w-30 grow f4-ns f6 link ph4-l ph2 pv2 dib white bg-light-purple' 
                        onClick={onButtonSubmit}
                    >
                        Detect
                    </button>
                    <p className='w-100 b bg-black-40 f4 red'>{errorMessage}</p>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm