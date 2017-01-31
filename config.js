var config = {
	nodeEnv: process.env.NODE_ENV || 'development',
	database: process.env.MONGODB_URI,
	database_development: 'mongodb://localhost/dnc-election',
	googleCaptchaKey: process.env.GOOGLE_CAPTCHA_KEY,
	paypalUsername: process.env.PAYPAL_USERNAME,
	paypalPassword: process.env.PAYPAL_PASSWORD,
	paypalSignature: process.env.PAYPAL_SIGNATURE,
	paypalClientId: process.env.PAYPAL_CLIENT_ID,
	paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET,
	paypalEnv: process.env.PAYPAL_ENV
};

module.exports = config;