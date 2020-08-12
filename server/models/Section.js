const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
	name: {type: String, required: true},
	displayName: {type: String, required: true},
	description: {type: String, required: true},
	introQuote: {
		quote: String,
		author: String
	}
});

const Section = mongoose.model('Section', SectionSchema);
module.exports = Section;
