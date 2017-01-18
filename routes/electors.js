'use strict';

var express = require('express');
var app = express();
var Elector = require('../models/elector');
var zipcodes = require('zipcodes');


app.post('/getAllElectors', function(req, res) {
    if (req.body.zip) {
        var state = zipcodes.lookup(req.body.zip).state;
    }
    else state = null;
    console.log(state);

    var age = req.body.age || '';
    var gender = req.body.gender || '';
    var abroad = req.body.abroad;

    var under_37 = false;
    var over_64 = false;
    var sex_female = false;
    var lives_abroad = false;

    var demo_info = req.body;
    console.log(demo_info);

    if (age < 37) {
        under_37 = true;
    }
    if (age > 64) {
        over_64 = true;
    }
    if (gender === 'female') {
        sex_female = true;
    }
    if (abroad === true) {
        lives_abroad = true;
    }
    if (age > 36 && age < 65 && sex_female === false && lives_abroad === false) {
        Elector.find({ 'state': state },
            function(err, electors) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(electors);
                };
            });
    } else if (under_37 === true && sex_female === true && lives_abroad === true) {
        console.log('2a')
        Elector.find({
            $or: [{ "under_37": true },
                { "sex_female": true },
                { 'lives_abroad': true }
            ]
        }, function(err, electors) {
            if (err) {
                console.log(err);
            } else {
                res.send(electors);
            };
        });
    } else if (over_64 === true && sex_female === true && lives_abroad === true) {
        console.log('2b');
        Elector.find({
            $or: [{ "over_64": true },
                { "sex_female": true },
                { 'lives_abroad': true }
            ]
        }, function(err, electors) {
            if (err) {
                console.log(err);
            } else {
                res.send(electors);
            };
        });
    } else if (under_37 === true && sex_female === true) {
        console.log('3a')
        Elector.find({
            $or: [{ under_37: true },
                { sex_female: true },
                { state: state }
            ]
        }, function(err, electors) {
            if (err) {
                console.log(err);
            } else {
                res.send(electors);
            };
        });
    } else if (over_64 === true && sex_female === true) {
                console.log('3b')
        Elector.find({
            $or: [{ "over_64": true },
                { "sex_female": true },
                { "state": state }
            ]
        }, function(err, electors) {
            if (err) {
                console.log(err);
            } else {
                res.send(electors);
            };
        });
    } else if (sex_female === true && lives_abroad === true) {
                console.log('3c')
        Elector.find({
            $or: [{ "lives_abroad": true },
                { "sex_female": true }
            ]
        }, function(err, electors) {
            if (err) {
                console.log(err);
            } else {
                res.send(electors);
            };
        });
    } else if (over_64 === true && lives_abroad === true) {
                    console.log('3d')

        Elector.find({
            $or: [{ "lives_abroad": true },
                { "over_64": true },
                { "state": state }
            ]
        }, function(err, electors) {
            if (err) {
                console.log(err);
            } else {
                res.send(electors);
            };
        });

    } else if (under_37 === true) {
        console.log('4a')
        Elector.find({
            $or: [{ "under_37": true },
                { "state": state }
            ]
        }, function(err, electors) {
            if (err) {
                console.log(err);
            } else {
                res.send(electors);
            };
        });
    } else if (over_64 === true) {
          console.log('4b')
        Elector.find({
            $or: [{ "over_64": true },
                { "state": state }
            ]
        }, function(err, electors) {
            if (err) {
                console.log(err);
            } else {
                res.send(electors);
            };
        });
    } else if (sex_female === true) {
              console.log('4c')
        Elector.find({
            $or: [{ "sex_female": true },
                { "state": state }
            ]
        }, function(err, electors) {
            if (err) {
                console.log(err);
            } else {
                res.send(electors);
            };
        });
    } else if (lives_abroad === true) {
              console.log('4d')
        Elector.find({"lives_abroad": true },
            function(err, electors) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(electors);
                };
            });
    }
});


module.exports = app;
