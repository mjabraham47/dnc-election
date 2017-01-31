var config = {
	nodeEnv: process.env.NODE_ENV || 'development',
	database: process.env.MONGODB_URI,
	database_development: 'mongodb://localhost/dnc-election',
	googleCaptchaKey: process.env.GOOGLE_CAPTCHA_KEY,
};

module.exports = config;