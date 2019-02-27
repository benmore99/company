// UserController.js

var express = require('express');
var multer = require('multer');
var router = express.Router();
var bodyParser = require('body-parser');

var User = require('./User');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, Date.now() + "." + extension)
  }
})

var upload = multer({ storage: storage });

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


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
        users.forEach(function(part, index, theArray) {
            var image = theArray[index].profile_image
            if (image) {
                theArray[index].profile_image = req.protocol + '://' + req.get('host') + "/" + image
            }
        });
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

router.post('/upload_profile_image/:id', upload.single('profile_image'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    // let extArray = req.file.mimetype.split("/");
    // let extension = extArray[extArray.length - 1];
    // var profile_image = req.file.path + "." + extension;

    let image_path = { profile_image: req.file.path };

    User.findByIdAndUpdate(req.params.id, image_path , {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
})


module.exports = router;


