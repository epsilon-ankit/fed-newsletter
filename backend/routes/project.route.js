const auth = require('../middleware/auth');
const { Project, validate, UpdateValidate } = require('../models/project.model');
const { Lead } = require('../models/lead.model');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let reqDatat = req.body;

    let lead = Lead.find({ name: req.body.dxPursuitLead }, (err, docs) => {
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
    }
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


router.put('/:id', auth, async (req, res) => {


    const { error } = UpdateValidate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let lead = Lead.find({ name: req.body.dxPursuitLead }, (err, docs) => {
        if (err) {
            res.status(500).send(err);
        }
        if (docs.length) {
            req.body.dxPursuitLead = docs[0]._id;
            updateProject();
        } else {
            res.status(500).send(err);
        }
    })


    async function updateProject() {
        const project = await Project.findByIdAndUpdate(req.params.id, {
            $push: {
                history: req.body
            }
        }, { new: true });

        if (!project) {
            return res.status(404).send('That platform ID was not found');
        }

        try {
            res.send(project);
        } catch (err) {
            req.send(err);
        }
    }


});

router.delete('/:id', auth, async (req, res) => {
    const project = await Project.findByIdAndRemove(req.params.id);

    if (!project) {
        return res.status(404).send('That platform ID was not found');
    }

    try {
        res.send(project);
    } catch (err) {
        req.send(err);
    }
});


module.exports = router;
