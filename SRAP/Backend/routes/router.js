const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const members = require('../models/members');

router.post('/members',(req, res)=>{
    let newMember = new members({
        memberid: req.body.memberid,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        address: req.body.address,
        birthdate: req.body.birthdate,
        email: req.body.email,
        gender: req.body.gender
    })
    members.addMember(newMember, (err, result)=>{
        if (!err){
            res.json(result)
        } else {
            res.json(err)
        }
    })
});

router.put('/members',(req, res)=>{
    let updateMember = new members({
        _id: req.body._id,
        memberid: req.body.memberid,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        address: req.body.address,
        birthdate: req.body.birthdate,
        email: req.body.email,
        gender: req.body.gender
    })
    members.updateMember(updateMember, (err, result)=>{
        if (!err){
            res.json(result)
        } else {
            res.json(err)
        }
    })
});

router.get('/members', (req, res)=>{
    members.getMembers((err, results)=>{
        res.json(results)
    })
})

router.get('/members/:id', (req, res)=>{
    members.getMemberById(req.params.id, (err, results)=>{
        res.json(results)
    })
})

module.exports = router;