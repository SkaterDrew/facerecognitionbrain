import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import {handleImage, handleApiCall} from './controllers/image.js';

const app = express();

// ----------------------- //
// ----------------------- //
// ------- MIDWARE ------- //
// ----------------------- //
// ----------------------- //

app.use(express.json());        // this is needed to parse the body of the request
app.use(cors({
    origin: 'http://localhost:3000'
}));

// ----------------------- //
// ----------------------- //
// ------- DATABASE ------- //
// ----------------------- //
// ----------------------- //

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'eipiplus1',
      database: 'smart-brain',
    },
  });


// ----------------------- //    / --> res = this is working
// ----------------------- //    /signin --> POST = success/fail
// ---- HTTP REQUESTS ---- //    /register --> POST = user
// ----------------------- //    /profile/:userId --> GET = user
// ----------------------- //    /image --> PUT = user.count


app.get('/', async (req, res) => {
    const users = await db.select('*').from('users')
    res.json(users);
})

app.post('/signin', handleSignin(db, bcrypt));

app.post('/register', handleRegister(db, bcrypt));

app.get('/profile/:id', handleProfile(db));

app.put('/image', handleImage(db));

app.post('/imageurl', handleApiCall);

app.listen(3001, () => {
    console.log('app is running on port 3001')
})