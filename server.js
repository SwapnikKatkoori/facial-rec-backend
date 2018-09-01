const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register=require('./controller/register.js')
const signin=require('./controller/signin.js')
const profile=require('./controller/profile.js')
const image=require('./controller/image.js')

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
   	ssl:true
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send("it is working");
})

app.post('/signin', (req,res)=>signin.handleSignIn(req,res,db,bcrypt))

app.post('/register',(req,res)=> register.handleRegister(req,res,db,bcrypt))

app.get('/profile/:id', (req,res)=>profile.handleProfileGet(req,res,db))

app.put('/image', (req,res)=>image.handleImage(req,res,db));
app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT, ()=> {
  console.log(`app is running on port ${process.env.PORT} `);
})

// test comment
