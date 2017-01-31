var config = {
	nodeEnv: process.env.NODE_ENV || 'development',
	database: process.env.MONGODB_URI,
	database_development: 'mongodb://localhost/dnc-election',
	paypalUsername: process.env.PAYPAL_USERNAME,
	paypalPassword: process.env.PAYPAL_PASSWORD,
	paypalSignature: process.env.PAYPAL_SIGNATURE
};

module.exports = config;