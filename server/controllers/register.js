const handleRegister = (db, bcrypt) => async (req, res) => {
    try {
        const { email, name, password } = req.body;

        // The server should handle all validation, never the front end !!!
        // If the request is not correct, return an error 400
        if(!name || !email || !password) {
            return res.status(400).json('incorrect form submission');
        }

        // Encrypt password
        const hash = bcrypt.hashSync(password);

        // use transaction when we need to create to objects at the same time, we then use trx instead of db

        // --- START TRANSACTION --- //
        const trx = await db.transaction();

        // save login details and return EMAIL
        const response1 = await trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email');
        const loginEmail = await response1[0].email;

        // use EMAIL to save user information
        const response2 = await trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail,
                joined: new Date()
            });
        const user = response2[0];

        // complete the transaction
        await trx.commit();

        // --- END TRANSACTION --- //

        return res.json(user);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export default handleRegister;

// module.exports = {
//     handleRegister: handleRegister
// }