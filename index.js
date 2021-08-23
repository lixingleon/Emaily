//顺序： User -> passport -> authRoutes
// mongoose 放在哪里无所谓

const cookieSession = require('cookie-session');
const passport = require('passport');
//parse the body of post request
const bodyParser = require('body-parser');

//googleOauth
require('./models/User');
//execute the code in passport.js
require('./services/passport');


//connect MongoDB
const keys = require('./config/keys');
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);

//execute all auth-related routes 
//use 'require' keword to access express library
const express = require('express');
const app = express();
/*
app.use method wires up middleware. 
middleware: is small functions that can be used to modify incoming requests before 
they are sent to route handlers.
*/
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge:30*24*60*60*1000, 
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
const authRoutes = require('./routes/authRoutes');
authRoutes(app);
// require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app);
if(process.env.NODE_ENV ==='production'){
    //Express will serve up production
    //like our main.js file or main.css file
    app.use(express.static('client/build'));
    //express will serve up the index.html file
    //if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}





//Dynamic Port Binding(heroku will inject environment variable at the run time)
const PORT = process.env.PORT|| 5000;
//need to figure out that will it perform as well if I put this at a different place
//express tells node to listen to 5000 port!!!!!!!! not itself listening
app.listen(PORT);

//until now, we could run index.js in terminal using :"node index.js" 
