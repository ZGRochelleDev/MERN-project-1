// MERN = Mongo Express React Node

// During Development = Node.js server + react server (this is a temp server just to see what it looks like during development)

// During Production = Node.js server + static react files

/* Steps */
// This initializes a directory with the default React packages: npm create-react-app client

// This will begin the client project: cd root folder:  npm start

// This initializes the NODE project: "CD server" then type -> npm init
// package.json should be in the server folder

// Next install Express framework - allows application to have easier to read syntax: npm add express
// Next add Nodemon. This will make development easier by automatically restating the server anytime there is an update: npm add nodemon --save-dev

// Add the following to the package.json file in the server dir.
    //"scripts": {"dev": "nodemon index.js"}
    // Anytime you run "npm run dev", that specified action will happen.

// Install package for MongoDB: npm add mongoose

// Install Json Web Token -> CD E:\code\MERN\project1\server -> "npm add jsonwebtoken"

// ** To Begin **
// CD E:\code\MERN\project1\client npm start
// CD E:\code\MERN\project1\server npm run dev

const express = require('express')
const app = express()
/* Setting up the CORS policy for the local development. Not really necessary on production
or else you'll get a cross origon error. This is because the client and server are on different ports. Security error. */
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
/* middleware initialized here*/
app.use(cors())
app.use(express.json()) //tells express, that anything that comes through body should be passed as json

mongoose.connect('mongodb://localhost:27017/reactProject1') //this returns a promise, but MongoDB will place this request in it's queue to do next. 27017 is the default mongoDB port.

app.post('/api/register', async (req,res)=>{
    console.log(req.body)
    //res.json({ status: 'ok'})
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

app.post('/api/login', async (req,res)=>{
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if(user){
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        },'token3182022');
    return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user:false })
    } 
})



app.get('/hello', (req,res)=>{
    res.send('hello world');
    return true;
})


app.listen(1337, ()=>{
    console.log('Server started on 1337');
    return true;

})