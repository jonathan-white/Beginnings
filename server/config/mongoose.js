const mongoose = require("mongoose");

// If deployed, use the deployed database. Otherwise use the local database
mongoose.Promise = Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/beginningsDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to MongoDB &
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log('Connection to database is active');
});