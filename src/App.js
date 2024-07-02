import React, { useState, useEffect, useMemo} from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import 'tachyons';
import './App.css';

function App() {

    const initialState = {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }

    
    // ------------------------------   -- //
    // ------------------------------   -- //
    // --------- Setting STATES ---------- //
    // ------------------------------   -- //
    // ------------------------------   -- //

    const [init, setInit] = useState(false);        // to check Particles background is fetched
    const [imageURL, setImageURL] = useState('');    // set the image URL
    const [inputURL, setInputURL] = useState('');    // register the input text
    const [errorMessage, setErrorMessage] = useState('');
    const [boxes, setBoxes] = useState([]);          // register the boxes coordinates for faces found in the image
    const [particlesOptions, setParticlesOptions] = useState();      //set the options for particles background
    const [route, setRoute] = useState('SignIn');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState(initialState);


    // ------------------------------   -- //
    // ------------------------------   -- //
    // --- Setting tsParticles Options --- //
    // ------------------------------   -- //
    // ------------------------------   -- //

    useEffect(() => {

        // --------- SETUP OPTIONS --------- //

        // Export json file from 'https://particles.js.org/' and save as particles.json in the 'public' folder to set the background. Can also directly modify options in that file.
        const fetchParticlesOptions = async () => {
            const response = await fetch('./particles.json');
            const result = await response.json();
            console.log(result);
            setParticlesOptions(result);
        }
        fetchParticlesOptions();

        
        // --------- START PARTICLES ENGINE --------- //

        const startParticles = async () => {
            await initParticlesEngine(async (engine) => {
                await loadAll(engine);
            });
            setInit(true);
        }
        startParticles();
    },[]);

    const getParticlesOptions = useMemo(() => {
        return particlesOptions
    }, [particlesOptions],);


    // ----------------------------------- //
    // ----------------------------------- //
    // --- Functions for Input & Click --- //
    // ----------------------------------- //
    // ----------------------------------- //

    const onInputChange = (event) => {
        // registers the text input
        setInputURL(event.target.value);
    }

    const onButtonSubmit = async () => {
        
        try {

            // ---------------------------------------------------------------- //
            // ------ Send request to SERVER to fetch Clairifai API data ------ //
            // ---------------------------------------------------------------- //

            const response = await fetch('http://localhost:3001/imageurl', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    input: inputURL
                })
            });

            const regions = await response.json();

        
            // ---------------------------------------------------------------- //
            // ------------------- Update ENTRIES for User -------------------- //
            // ---------------------------------------------------------------- //

            if (regions) {
                const image = await fetch('http://localhost:3001/image', {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: user.id
                    })
                });
                const count = await image.json();
                setUser(Object.assign(user, { entries: count }));
            }
            

            // ---------------------------------------------------------------- //
            // --------------- Manipulate regions data into CSS --------------- //
            // ---------------------------------------------------------------- //

            const regionBoxes = await regions.map(region => {
                // Accessing and rounding the bounding box values, turning them into % for absolute position, then saving it as an object to pass as CSS
                const boundingBox = region.region_info.bounding_box;
                return {
                    top: (boundingBox.top_row * 100) + '%',
                    right: ((1 - boundingBox.right_col) * 100) + '%',      // the horizontal position is from left, so we adjust for right with the complement
                    bottom: ((1 - boundingBox.bottom_row) * 100) + '%',        // the vertical position is from top, so we adjust for bottom with the complement
                    left: (boundingBox.left_col * 100) + '%'
                }
            });
            

            // ---------------------------------------------------------------- //
            // -------------------------- SET STATES -------------------------- //
            // ---------------------------------------------------------------- //

            setBoxes(regionBoxes);
            setImageURL(inputURL);      // we set the image URL after fetching the clarifai response, so that the image changes after the clarifai fetch, otherwise the face boxes did not render, but image changed
            setInputURL('');
            setErrorMessage('');

        } catch (error) {
            setImageURL('');
            setBoxes([]);
            setErrorMessage('Please enter a valid image URL');
        }
    }

    // ------------------------------- //
    // ------------------------------- //
    // --------- ROUTE CHANGE -------- //
    // ------------------------------- //
    // ------------------------------- //

    const onRouteChange = (route) => {
        if (route === 'SignIn') {
            setIsSignedIn(false)
        } else if (route === 'home') {
            setIsSignedIn(true)
        }
        setRoute(route)
    }

    // --- reset forms on SIGN OUT --- //
    useEffect(() => {
        if (!isSignedIn) {
            setImageURL('');
            setBoxes([]);
            setInputURL('');
            setErrorMessage('');
        }
    },[isSignedIn])

    // ------------------------------- //
    // ------------------------------- //
    // ------ Updating USER DATA ----- //
    // ------------------------------- //
    // ------------------------------- //

    const loadUser = (data) => {
        const user = {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }
        setUser(user)
    }

    // ------------------------------- //
    // ------------------------------- //
    // ---------- RENDERING ---------- //
    // ------------------------------- //
    // ------------------------------- //

    if (init) {
        // renders only when Particles background is ready
        return (
            <div className="App">
                <Particles id="tsparticles" className='particles' options={getParticlesOptions} />
                <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
                <Logo/>
                {route === 'home'
                    ? <div>
                        <Rank user={user}/>
                        <ImageLinkForm 
                            input={inputURL}
                            onInputChange={onInputChange}
                            onButtonSubmit={onButtonSubmit}
                            errorMessage={errorMessage}
                        />
                        <FaceRecognition imageURL={imageURL} boxes={boxes}/>
                    </div>
                    : (
                        route === 'SignIn'
                        ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
                        : <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
                    )
                }
            </div>
        );
    }

    return <div>LOADING</div>
}

export default App;
