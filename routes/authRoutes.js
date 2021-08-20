const passport = require('passport');

module.exports = app =>{ //this is only a function, the argument could be anything
    //this is a route handler
    //whenever someone visits this route, they should be 
    //directed into the passport authentication flow
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );          //这两个route几乎一样
    app.get(
        '/auth/google/callback',  // when user is directed to this uri. there is a code behind 'callback',
        passport.authenticate('google')//passport will then take this code and correspond with google again in exchange for user profile and email
    );

    app.get('/api/logout', (req, res) =>{
        //logout method deletes the cookie which represents the unique user.
        req.logout();
        res.send(req.user);

    });

    app.get('/api/current_user', (req, res) =>{
        //res.send(req.session);
        res.send(req.user);
    });
}
