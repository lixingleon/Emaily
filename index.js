//use require keword to access express library
const express = require('express');
const app = express();
//this is a route handler
app.get('/', (req, res) => {
    res.send({hi:'there'});
});

//Dynamic Port Binding(heroku will inject environment variable at the run time)
const PORT = process.env.PORT|| 5000;
//need to figure out that will it perform as well if I put this at a different place
//express tells node to listen to 5000 port!!!!!!!! not itself listening
app.listen(PORT);

//until now, we could run index.js in terminal using :"node index.js" 
