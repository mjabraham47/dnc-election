'use strict';

var express = require('express');
var app = express();
var Elector = require('../models/elector');
var zipcodes = require('zipcodes');


app.get('/getStateElectors/:zip', function(req,res) {
    var state = zipcodes.lookup(req.body.zip).state;
    Elector.findAll({state: user.state}, function(err, electors) {
        if (err) {
            console.log(err);
        } else {
            res.send(electors);
        };
    });    
});

app.post('/getAllElectors', function(req,res) {
	var state = zipcodes.lookup(req.body.zip).state;	
	var under_37 = false;
	var over_64 = false;
	var sex_female = false;
	var lives_abroad = false;

    var demo_info = req.body;
    console.log(demo_info);
    if (req.body.age < 37) {
    	under_37 = true;
    }
    if (req.body.age > 64) {
    	over_64 = true;
    }
    if (req.body.gender === 'female') {
    	sex_female = true;
    }
    if (req.body.abroad === true) {
    	lives_abroad = true;
    }

    if (under_37 === true && sex_female === true && lives_abroad === true) {
		Elector.findAll({$or: [{ "under_37": true },
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
    } 
    else if (over_64 === true && sex_female === true && lives_abroad === true) {
		Elector.findAll({$or: [{ "over_64": true },
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
    }
    else if (under_37 === true && sex_female === true) {
		Elector.findAll({$or: [{ "under_37": true },
                { "sex_female": true },
                { "state": state}
            ]
        }, function(err, electors) {
	        if (err) {
	            console.log(err);
	        } else {
	            res.send(electors);
	        };
    	});  
    }
    else if (over_64 === true && sex_female === true) {
		Elector.findAll({$or: [{ "over_64": true },
                { "sex_female": true },
                { "state": state}
            ]
        }, function(err, electors) {
	        if (err) {
	            console.log(err);
	        } else {
	            res.send(electors);
	        };
    	});  
    }
    else if (sex_female === true && lives_abroad === true) {
		Elector.findAll({$or: [{ "lives_abroad": true },
                { "sex_female": true }
            ]
        }, function(err, electors) {
	        if (err) {
	            console.log(err);
	        } else {
	            res.send(electors);
	        };
    	}); 
    }
    else if (over_64 === true && lives_abroad === true) {
		Elector.findAll({$or: [{ "lives_abroad": true },
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

    }
    else if (under_37 === true){
	Elector.findAll({$or: [{ "under_37": true },
                { "state": state }
            ]
        }, function(err, electors) {
	        if (err) {
	            console.log(err);
	        } else {
	            res.send(electors);
	        };
    	});
    }
    else if (over_64 === true) {
	Elector.findAll({$or: [{ "over_64": true },
                { "state": state }
            ]
        }, function(err, electors) {
	        if (err) {
	            console.log(err);
	        } else {
	            res.send(electors);
	        };
    	});
    }
    else if (sex_female === true) {
	Elector.findAll({$or: [{ "sex_female": true },
                { "state": state }
            ]
        }, function(err, electors) {
	        if (err) {
	            console.log(err);
	        } else {
	            res.send(electors);
	        };
    	});
    }
    else if (lives_abroad === true) {
	Elector.findAll({lives_abroad: true },
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