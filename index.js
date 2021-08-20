//顺序： User -> passport -> authRoutes
// mongoose 放在哪里无所谓

const cookieSession = require('cookie-session');
const passport = require('passport');


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





//Dynamic Port Binding(heroku will inject environment variable at the run time)
const PORT = process.env.PORT|| 5000;
//need to figure out that will it perform as well if I put this at a different place
//express tells node to listen to 5000 port!!!!!!!! not itself listening
app.listen(PORT);

//until now, we could run index.js in terminal using :"node index.js" 
