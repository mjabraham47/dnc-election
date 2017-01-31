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
                membership: elector.Membership,
                title: elector.Title,
                phone: elector.Phone,
                state: elector.State,
                personal_email: elector.PersonalEmail,
                under_37_group: Boolean(elector.Age_36andunder),
                over_64_group: Boolean(elector.Age_65andolder),
                female_group: Boolean(elector.Sex_female),
                abroad_group: Boolean(elector.abroad)
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
                endorsements: Math.floor( Math.random() * 1000 ) 
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
seed.parseStates(stateFile);
seed.parseCandidates(candidateFile);
seed.parseElectors(electorFile);

module.exports = seed;
