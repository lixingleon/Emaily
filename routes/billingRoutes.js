const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    //inside app.post(), we can put as many middleware in as we want
    app.post('/api/stripe',requireLogin, async (req, res) =>{
        //now the token of stripe is inside req.body
        //console.log(req.body);
        //this stripe.charges.create function gonna actually bill the credit card
        //returns an object that representing charge that  just occurred
        // if(!req.user){
        //     return res.status(401).send({error: 'You must log in! '});
        // }
        const charge =  await stripe.charges.create({
            amount:500,
            currency:'usd',
            description:'$5 for 5 credits',
            source:req.body.id
        });
        //thanks to passport used in index.js,
        //req.user is the current user instance
        req.user.credits += 5;
        //save the user to database
        const updatedUser =  await req.user.save();
        res.send(updatedUser);
    });
};