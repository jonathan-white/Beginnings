const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FactSchema = new Schema({
	themes: [],
	info: {type: String, required: true},
	image: {
		src: String,
		alt: String
	},
	page: Number,
	dateCreated: { type: Date, default: Date.now },
	dateModified: { type: Date, default: Date.now },
});

const Fact = mongoose.model('Fact', FactSchema);
module.exports = Fact;
