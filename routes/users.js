const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router();

//User Model
const User = require('../models/User');

//Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    res.render('dashboard',{user:req.body});
});

//Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    //getting required fields out of req.body by destructuring
    const {name,email,password,password2} = req.body;
    let errors = [];

    //Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({
            msg: 'Please fill in all fields'
        });
    }

    if (password !== password2) {
        errors.push({
            msg: "Passwords don't match !"
        });
    }

    //Check Password Length
    if (password.length < 6) {
        errors.push({
            msg: "Password should be at least 6 characters !"
        });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email
        });
        return;
    }
        User.findOne({
            email: email
        })
        .then((user) => {
            if (user) {
                errors.push({
                    msg: 'Email is already registered'
                })
                // ES6 Object initialization (instead of name:name, email:email)
                res.render('register', {
                    errors,
                    name,
                    email
                });
                return;
            } 
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //Encrypt Password With Bcrypt
                bcrypt.genSalt(10,(err,salt) =>
                    bcrypt.hash(newUser.password,salt, (err,hash) =>{
                        if(err) throw err;
                        //Set password to hash
                        newUser.password = hash;

                        newUser.save()
                        .then((user) => res.redirect('/users/login'))
                            .catch((err) => console.log(err))
                }));
        })
});






module.exports = router