const handleSignin = (db, bcrypt) => async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // If the request is not correct, return an error 400
        if (!email || !password) {
            return res.status(400).json('wrong email/password')
        }

        // Retrieve hash from database
        const data = await db.select('email', 'hash')
            .from('login')
            .where('email', '=', email);
        const { hash } = data[0];

        // verify if password is correct by comparing with hash
        const isValid = bcrypt.compareSync(password, hash);

        // respond according to password verification
        if (isValid) {
            try {
                const user = await db.select('*').from('users').where('email', '=', email);
                res.json(user[0]);
            } catch (error) {
                res.status(400).json('unable to get user');
            }
        } else {
            res.status(400).json('wrong email/password');
        }
        
    } catch (error) {
        res.status(400).json('wrong email/password');
    }
}

export default handleSignin;