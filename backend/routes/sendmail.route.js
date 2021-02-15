const auth = require('../middleware/auth');
const {Email,validate } = require ('../models/sendmail.model');
// const mongoose = require('mongoose');
var express=require('express');
// var bodyParser = require('body-parser')// importing body parser middleware to parse form content from HTML
const emailRouter = express.Router();
var nodemailer = require('nodemailer');//importing node mailer

emailRouter.route('/', async (req, res)=>{
    // console.log("Coming email here");
    res.sendStatus(200);
})

// route which captures form details and sends it to your personal mail
emailRouter.post('/', async (req, res)=>{
  
  console.log(req.body.email);

  console.log("request came");

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    let email = new Email({ email: req.body.email });
    email = await email.save();
 
    res.send(email);
  
  /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
    here we are using gmail as our service 
    In Auth object , we specify our email and password
  */
 let transporter = nodemailer.createTransport({
    host: "pc1relay.epsilon.com",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '', // generated ethereal user
      pass: '' // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  /*
    In mail options we specify from and to address, subject and HTML content.
    In our case , we use our personal email as from and to address,
    Subject is Contact name and 
    html is our form details which we parsed using bodyParser.
  */
  var mailOptions = {
    from: 'rashmi.badami@epsilon.com',//replace with your email
    to: req.body.email,//replace with your email
    subject: `DX Mailer Testing`,
    html:`Email Test Sent Sucessful`
  };
  
  /* Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
   call back as parameter 
  */

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      // res.send('error in this area') // if error occurs send error as response to client
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
    }
  });
})


module.exports = emailRouter;