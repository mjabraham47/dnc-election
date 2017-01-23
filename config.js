var config = {
	nodeEnv: process.env.NODE_ENV || 'development',
	database: process.env.DATABASE_URL
};

module.exports = config;