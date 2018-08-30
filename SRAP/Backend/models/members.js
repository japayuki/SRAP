const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const config = require('../config/database');

const membersSchema = mongoose.Schema({
    memberid: {
        type: String,
        required: true,
        unique: true
    },
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    birthdate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const members = module.exports = mongoose.model('members', membersSchema);

module.exports.getMemberById = function(memberId, callback){
    members.findById(memberId, callback)
}

module.exports.getUserByMemberId = function(memberId, callback){
    const query = {memberid: memberId}
    members.findOne(query, callback)
}

module.exports.getMembers = function(callback){
    members.find(callback)
}

module.exports.addMember = function(newMember, callback){
    newMember.save(callback)
}

module.exports.updateMember = function(updateMember, callback){
    console.log(updateMember);
    members.findByIdAndUpdate(updateMember._id, updateMember, callback)
}