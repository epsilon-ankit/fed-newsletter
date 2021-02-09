const auth = require('../middleware/auth');
//const { Project, validate, UpdateValidate } = require('../models/project.model');
const { Lead } = require('../models/lead.model');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
    //const { error } = validate(req.body);
    /* if (error) {
        return res.status(400).send(error.details[0].message);
    } */

    let reqData = req.body;
    console.log(`Request Data: ${reqData}`);
    const output = `
        <div>
            <p>${reqData.field1}</p>
            <p>${reqData.field2}</p>
        </div>
    `;

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

      let mailOptions = {
        from: 'ankit.bhatia@epsilon.com', // sender address
        to: "chethan.kumar@epsilon.com", // list of receivers
        subject: "Directly from my local node server!", // Subject line
        text: "Hello world!", // plain text body
        html: output // html body
      }

      let info = transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log("error here")
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        });

      /* let leads = Lead.find({}, (err, docs) => {
          console.log(`Lead DOCS: ${docs}`);
      }) */

    /* let lead = Lead.find({ name: req.body.dxPursuitLead }, (err, docs) => {
        if (err) {
            res.send(err);
        }
        if (docs.length) {
            reqDatat.dxPursuitLead = docs[0]._id;
            projectInsert(reqDatat);
        } else {
            let leadSave = new Lead({ name: req.body.dxPursuitLead, email: req.body.dxLeadEmail });
            leadSave.save();
            reqDatat.dxPursuitLead = leadSave._id;
            projectInsert(reqDatat);
        }
    })

    async function projectInsert(args) {
        let project = new Project(args);
        project = await project.save();
        try {
            res.send(project);
        } catch (err) {
            res.send(err)
        }
    } */
});


router.get('/', auth, async (req, res) => {
    const query = req.query;
    const project = await Project.find(query).populate("dxPursuitLead").populate("history.dxPursuitLead");
    //   const project = await Project.find({
    //     "$text": {
    //       "$search": query
    //     }
    //   })
    res.send(project);
});


module.exports = router;
