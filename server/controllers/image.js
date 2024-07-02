// -------------------------------- //
// -------------------------------- //
// --- Setting Clarifai Options --- //
// -------------------------------- //
// -------------------------------- //

const handleApiCall = async (req, res) => {

    // -------- SETUP CLARIFAI OPTIONS -------- //
    
    //change the response function if changing the model
    const MODEL_ID = 'face-detection'

    // set the Clarifai options based on personal token and app/model used
    const PAT = '15d4833f4fb34119ad2474cc270046e1';
    const USER_ID = 'evendh0emcfz';
    const APP_ID = 'face-recognition-brain';

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": req.body.input
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // -------- FETCH CLARIFAI RESPONSE -------- //

    try {
        const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions);
        const result = await response.json();

        const regions = await result.outputs[0].data.regions;

        return res.json(regions);
    } catch (error) {
        return res.status(400).json('unable to run face detection');
    }
}

// -------------------------------- //
// -------------------------------- //
// ---- Updating ENTRIES count ---- //
// -------------------------------- //
// -------------------------------- //

const handleImage = db => async (req, res) => {
    try {
        const { id } = req.body;
        const response = await db('users').where('id', '=', id).increment('entries', 1).returning('entries');
        const entries = response[0].entries;
        res.json(entries);
    } catch (error) {
        res.status(400).json('unable to get entries');
    }
}

export {
    handleApiCall,
    handleImage
}