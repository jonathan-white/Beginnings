const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlowerSchema = new Schema({
	name: {type: String, required: true},
	descr: {type: String, required: true},
	uses: [String],
	image: String,
});

const Flower = mongoose.model('Flower', FlowerSchema);
module.exports = Flower;
