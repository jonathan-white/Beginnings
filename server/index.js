// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
require('./config/mongoose');

// Start Listenting
// ========================================================
app.listen(config.port, function() {
	console.log(`server started on port ${config.port}`);
});

module.exports = app;