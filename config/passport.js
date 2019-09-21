const localStrategy = require('passport-local')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//Load User Model
const User = require('../models/User')

module.exports = (passport) => {
    passport.use(
        new localStrategy({usernameField: 'email'},(email, password, done) => {
                //Check whether a user with this email exists
                User.findOne({email: email})
                  .then((user) => {
                    if (!user) {
                        return done(null, false, {message: 'Email cannot be found'});
                    }

                    //Match password
                    bcrypt.compare(password,user.password,(err, match) =>{
                        if(err) throw err;
                        return match ? done(null, user) : done(null, false,{message: 'Password incorrect'});
                    });
                }).catch(err => console.log(err));
            })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}