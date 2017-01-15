var xlsx = require('node-xlsx').default;
var fs = require('fs');
var Elector = require('./models/elector');
var Candidate = require('./models/candidate');
var State = require('./models/state');
var electorFile = require('./electors.js');
var candidateFile = require('./candidates.js');
var stateFile = require('./states.js');

var seed = {
    seedElectors : function(elector) {
        Elector.create({
            name: elector.Name,
            email: elector.Email,
            phone: elector.Phone,
            address: elector.Address,
            state: elector.State
        }, function(err, elect) {
        	if(err) {
        		console.log(err);
        	} else {
        		elect.save()
        	}
    	});
    },
    seedCandidates : function(candidate) {
        Candidate.create({
            first_name: candidate.FirstName,
            last_name: candidate.LastName,
            bio: candidate.Bio,
            twitter: candidate.Twitter,
            website: candidate.Website,
            photo: candidate.Photo,
            image_source: candidate.ImageSource,
            vision: candidate.Vision,
            platform: candidate.Platform,
            facebook: candidate.Facebook,
            endorsements: 0
        }, function(err, candid) {
        	if(err) {
        		console.log(err);
        	} else {
        		candid.save()
        	}
    	});
    },
    seedStates : function(state) {
        State.create({
           state: state.State,
           name: state.Name,
           line_1: state.Line1,
           line_2: state.Line2,
           line_3: state.Line3
        }, function(err, stat) {
            if(err) {
                console.log(err);
            } else {
                stat.save()
            }
        });
    },
	parseCandidates : function(candidates) {
		for (var i = 0; i < candidates.length; i++) {
			this.seedCandidates(candidates[i]);
			}
	},
	parseElectors : function(electors) {
		for (var i = 0; i < electors.length; i++) {
			this.seedElectors(electors[i]);
		};
	},
    parseStates : function(states) {
        for (var i = 0; i < states.length; i++) {
            this.seedStates(states[i]);
        };
    }
}
seed.parseStates(stateFile);
// seed.parseCandidates(candidateFile);
// seed.parseElectors(electorFile);

module.exports = seed;
