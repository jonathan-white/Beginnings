const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TermSchema = new Schema({
	term: {type: String, required: true},
	meaning: {type: String, required: true},
});

const Term = mongoose.model('Term', TermSchema);
module.exports = Term;
