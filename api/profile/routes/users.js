const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

const multer = require('multer');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
router.use(express.json());

const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, './images/');
    },
    filename: function(req, file, cb)
    {
        cb(null, req.body.userName + file.originalname);
    }
});

const filefilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' )
    {
        cb(null , true);

    }else{
        cb(new Error('File Type not allowed') , false);
    }
};

const upload = multer({storage: storage, fileFilter : filefilter});

router.get('/', (req, res, next) => {
   User
   .find()
   .exec()
   .then(docs => 
{
    console.log(docs);
    res.status(200).json(docs);
})
   .catch(err =>
        {
            console.log(err);
            res.status(500).json(
                {
                    error: err
                }
            )
        });
});

router.post('/', verifytoken ,upload.single('profilePicture') ,(req, res, next) => {
    router.use(express.json());
   
    jwt.verify(req.token,"AB1234", function(err, decoded){
        if(err)
        {
            res.sendStatus(403);
        }
        else{
            User.findOne({ userName : req.body.userName})
            .exec()
            .then(doc => {
                if(doc)
                {
                    console.log('test');
                    res.status(409).json({
                        message : "Profile with that userName already exists"
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        userName: req.body.userName,
                        fullName: req.body.fullName,
                        bio: req.body.bio,
                        profileImaagePath: req.body.userName + req.file.originalname
                    })
                    user
                        .save()
                        .then(result => {
                            console.log(result);
                        })
                        .catch(err => console.log(err));
                    res.status(200).json({
                       message: user
                    });
                }
            });
        }
    });
});

router.get('/:userName', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const userName = req.params.userName;
    User.findOne({ userName : userName})
    .exec()
    .then(doc => {
        if(doc)
        {
            console.log(doc);
            res.status(200).json(doc);
        }else{
                res.status(404).json({
                    message: "No valid id"
                 });
        }
    })
    .catch(err =>
        {
            console.log(err);
            res.status(500).json({
                message: "invalid type"
             });
        });
});

router.post('/authenticate', (req, res, next) => {
    console.log(req.body.key);
        var token = jwt.sign("s)sDzDyU~RS5,hWOGcHTQ4v^JDjF}U" ,req.body.key);
        res.status(200).json({
            token : token
        });

});

function verifytoken(req, res, next)
{
    const authheader = req.headers['authorization'];
    console.log(authheader);
    if(typeof authheader === "undefined")
    {
        res.status(403).json({
            meesage: "Missing auth token"
        })
    }else{
        const authtoken = authheader.split(' ')[1];
        req.token = authtoken;
        next();
    }
}

module.exports = router;