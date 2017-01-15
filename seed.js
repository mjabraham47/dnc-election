var xlsx = require('node-xlsx').default;
var fs = require('fs');
var Elector = require('./models/elector');
var Candidate = require('./models/candidate');
var electorFile = require('./electors.js');
var candidateFile = require('./candidates.js');

var seed = {
    seedElectors : function(elector) {
        Elector.create({
            name: elector.Name,
            email: elector.Email,
            phone: elector.Phone,
            address: elector.Address,
            state: elector.State
        }, function(err, elector) {
        	if(err) {
        		console.log(err);
        	} else {
        		elector.save()
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
        }, function(err, candidate) {
        	if(err) {
        		console.log(err);
        	} else {
        		candidate.save()
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
	}
}

// seed.parseCandidates(candidateFile);
// seed.parseElectors(electorFile);

module.exports = seed;
