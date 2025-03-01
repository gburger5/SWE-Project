const path = require('path');

module.exports = {
	// render homepage
	getIndex: (req, res)=>{
		res.sendFile(path.join( __dirname, "..", 'views', 'home.html'));
	}
}