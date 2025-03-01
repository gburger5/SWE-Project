require('dotenv').config({path: './config' + '/.env'})

module.exports = {
	environment: process.env.NODE_ENV || "development",
	port: parseInt(process.env.PORT)  || 7777,
}
