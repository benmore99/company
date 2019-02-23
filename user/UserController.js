// UserController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require('./User');

// CREATES A NEW USER
router.post('/', function (req, res) {
    User.create({
            employee_id: req.body.employee_id,
            firstname: req.body.firstname,
            firstname_en: req.body.firstname_en,
            lastname: req.body.lastname,
            lastname_en: req.body.lastname_en,
            nickmane: req.body.nickmane,
            birth_date: req.body.birth_date,
            position: req.body.position,
            team: req.body.team,
            email: req.body.email,
            phone: req.body.phone,
            shirt_size: req.body.shirt_size,
            facebook_id: req.body.facebook_id,
            line_id: req.body.line_id,
            instagram_id: req.body.instagram_id,
            profile_image: req.body.profile_image,
            cover_image: req.body.cover_image,
            password: req.body.password
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

module.exports = router;