const path = require('path');

module.exports = {
	// render IDE page
	getEditor: (req, res)=>{
		res.sendFile(path.join( __dirname, "..", 'views', 'IDE.html'));
	}
}