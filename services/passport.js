//Google OAuth的逻辑代码
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//this is a model class(就是一个类)
const User = mongoose.model('users'); // 得到的是我们在User.js里定义的userSchema

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) =>{
    User.findById(id)
    .then(user =>{
        done(null, user);
    });
});


passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, 
        //after the follow up request is made，this function is executed
        //(follow up requrest to google: passport automatically 
        //make a request to google with the ”code“ google just gave us 
        //in exchange for user profile and email address)
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleId: profile.id})
                .then(existingUser =>{
                    if(existingUser){
                        //we already have the user's record
                        done(null, existingUser);
                    }
                    else{
                        //we dont have the user's record
                        new User({googleId: profile.id})
                        .save()
                        .then(user => done(null, user));
                    }

                } )
        }
    )
);