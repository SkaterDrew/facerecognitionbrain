const handleProfile = db => async (req, res) => {
    const { id } = req.params;
    const response = await db.select('*').from('users').where({ id });

    // response will return an array of 1 if profile is found, or none if not found
    const user = response[0];

    // if no profile found, user === undefined, so false
    if (user) {
        res.json(user);
    } else {
        res.status(400).json('no such user');
    }
}

export default handleProfile;