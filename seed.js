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
        Elector.remove({}, function(err, response, next){
            if (err) next(err);
            Elector.create({
                name: elector.Name,
                phone: elector.Phone,
                state: elector.State,
                personal_email: elector.Email
            }, function(err, elect) {
            	if(err) {
            		console.log(err);
                    throw err;

            	} else {
            		elect.save()
            	}
        	});
        });
    },
    seedCandidates : function(candidate) {
        Candidate.remove({}, function(err, response, next) {
            if (err) next(err);

            Candidate.create({
                first_name: candidate.first_name,
                last_name: candidate.last_name,
                bio: candidate.bio,
                twitter: candidate.twitter,
                website: candidate.website,
                photo: candidate.photo,
                vision: candidate.vision,
                platform: candidate.platform,
                facebook: candidate.facebook,
                endorsements: 0
            }, function(err, candid) {
                if(err) {
                    console.log(err);
                    throw err;
                } else {
                    candid.save();
                }
            });
        });
        
    },
    seedStates : function(state) {
        State.remove({}, function(err, response, next){
            if (err) next(err);

            State.create({
               state: state.state,
               name: state.name,
               street_address: state.street_address,
               city: state.city,
               zip: state.zip,
               website: state.website,
               email: state.email,
               phone: state.phone
            }, function(err, stat) {
                if(err) {
                    console.log(err);
                    throw err;
                } else {
                    stat.save()
                }
            });
        })
        
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
};
// seed.parseStates(stateFile);
// seed.parseElectors(electorFile);
// seed.parseCandidates(candidateFile);

module.exports = seed;
