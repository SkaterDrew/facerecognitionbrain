import React, { useState } from 'react';

const Register = ({ onRouteChange, loadUser, server }) => {
    
    const [ signInName, setSignInName ] = useState('');
    const [ signInEmail, setSignInEmail ] = useState('');
    const [ signInPassword, setSignInPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');

    const onNameChange = (event) => {
        setSignInName(event.target.value);
    }

    const onEmailChange = (event) => {
        setSignInEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value);
    }

    const onSubmitSignin = async (event) => {

        // prevents the default form submission behavior
        event.preventDefault();

        // send the POST request to server
        const response = await fetch(server + 'register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword,
                name: signInName
            })
        });

        const user = await response.json();

        // make the app respond
        if (user.id) {
            loadUser(user);
            onRouteChange('home');
            setErrorMessage('');
            setErrorMessage('');
        } else {
            setSignInName('');
            setSignInEmail('');
            setSignInPassword('');
            setErrorMessage('incorrect form submission');
        }
    };

    return (
        <article className="bg-white-10 shadow-2 br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
            <main className="pa4 white-80">
                <form className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="center f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label 
                                className="db fw6 lh-copy f6" 
                                htmlFor="email-address"
                            >
                                Name
                            </label>
                            <input 
                                onChange={onNameChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">
                                Email
                            </label>
                            <input 
                                onChange={onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                            />
                        </div>
                        <div className="mv3">
                            <label 
                                className="db fw6 lh-copy f6" 
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input 
                                onChange={onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                            />
                        </div>
                        <div>
                            <p className='w-100 b bg-black-40 f5 red'>
                                {errorMessage}
                            </p>
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            className="b ph3 pv2 input-reset white ba b--white bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Confirm"
                            onClick={onSubmitSignin}
                        />
                    </div>
                </form>
            </main>
        </article>
    )
}

export default Register;