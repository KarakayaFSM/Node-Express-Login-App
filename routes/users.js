const express = require('express')

const router = express.Router();

//Login Page
router.get('/login', (req, res) => {
    res.render('login');
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
    }

});






module.exports = router