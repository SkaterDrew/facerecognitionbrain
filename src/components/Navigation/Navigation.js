import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    return (
        <nav className='flex justify-end'>
            { isSignedIn
                ? <p onClick={() => onRouteChange('SignIn')} className='f3 link dim underline pa3 pointer'> Sign Out </p>
                : (
                    <div className='flex justify-end'>
                        <p onClick={() => onRouteChange('SignIn')} className='f3 link dim underline pa3 pointer'> Sign In </p>
                        <p onClick={() => onRouteChange('Register')} className='f3 link dim underline pa3 pointer'> Register </p>
                    </div>
                )
            }
        </nav>
    )
}

export default Navigation;