const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    createdAt: Date,
    updatedAt: Date,
    token: String,
    tokenExpiration: Date
});

userSchema.methods.generateTkn = function (callback) {
    //todo: jwt.io to generate token
    var profile = {
        name: this.name,
        username: this.username,
        admin: this.admin,
        id: this._id
    };

    var token = jwt.sign(profile, process.env.AUTH0_CLIENT_SECRET, { expiresIn: 3600 }); //expires in 1 hour

    var expirationDate = moment().add(2, 'hours');
    console.log('tkn expiration date: ' + expirationDate);

    this.token = token;
    this.tokenExpiration = expirationDate;

    return this.save().then(function (doc) {
        console.log('tkn saved');
        return token;
    });

}

// on every save, add the date
userSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;