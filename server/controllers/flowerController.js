const db = require('../models');
const keys = require("../keys");

module.exports = {
  findAll: (req, res) => {
    db.Flower.
      find({}).
      sort({ name: 1 }).
      then(dbModel => res.json(dbModel)).
      catch(err => res.status(422).json(err));
	},
	findFlowers: (req, res) => {
		if(req.query.apiKey === keys.api_key){
			db.Flower.
				find({ item: { $regex: req.query.q, $options: "i" } }).
				sort({ name: 1 }).
				then(dbModel => res.json(dbModel)).
				catch(err => res.status(422).json(err));
		} else {
			res.status(401).send('Not Authorized');
		}
	},
  findById: function(req, res) {
    db.Flower.
      findById({ _id: req.params.id}).
      then(dbModel => res.json(dbModel)).
      catch(err => res.status(422).json(err));
  },
	create: function(req, res) {
		if(req.get('Authorization') === keys.api_key){
			db.Flower.
				create(req.body).
				then(dbModel => res.json(dbModel)).
				catch(err => res.status(422).json(err));
		} else {
			res.status(401).send('Not Authorized');
		}
  },
  update: function(req, res) {
		if(req.get('Authorization') === keys.api_key){
			db.Flower.
				findOneAndUpdate({ _id: req.params.id }, req.body).
				then(dbModel => 
					db.Flower.
            findById({ _id: dbModel._id}).
						then(updatedModel => res.json(updatedModel)).
						catch(err => res.status(422).json(err))
				).
				catch(err => res.status(422).json(err));
		} else {
			res.status(401).send('Not Authorized');
		}
  },
  remove: function(req, res) {
		if(req.get('Authorization') === keys.api_key){
			db.Flower.
				findById({ _id: req.params.id }).
				then(dbModel => dbModel.remove()).
				then(dbModel => res.json(dbModel)).
				catch(err => res.status(422).json(err));
		} else {
			res.status(401).send('Not Authorized');
		}
  }
};
