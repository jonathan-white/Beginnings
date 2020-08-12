const db = require('../models');
const keys = require("../keys");

module.exports = {
  findAll: (req, res) => {
    db.Fact.
      find({}).
      sort({ page: 1 }).
      then(dbModel => res.json(dbModel)).
      catch(err => res.status(422).json(err));
	},
	findFacts: (req, res) => {
		if(req.query.apiKey === keys.api_key){
			db.Fact.
				find({ item: { $regex: req.query.q, $options: "i" } }).
				sort({ page: 1 }).
				then(dbModel => res.json(dbModel)).
				catch(err => res.status(422).json(err));
		} else {
			res.status(401).send('Not Authorized');
		}
	},
  findById: function(req, res) {
    db.Fact.
      findById({ _id: req.params.id}).
      then(dbModel => res.json(dbModel)).
      catch(err => res.status(422).json(err));
  },
	create: function(req, res) {
		if(req.params.id === keys.api_key){
			db.Fact.
				create(req.body).
				then(dbModel => res.json(dbModel)).
				catch(err => res.status(422).json(err));
		} else {
			res.status(401).send('Not Authorized');
		}
  },
  update: function(req, res) {
		if(req.get('Authorization') === keys.api_key){
			db.Fact.
				findOneAndUpdate({ _id: req.params.id }, req.body).
				then(dbModel => 
					db.Fact.
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
			db.Fact.
				findById({ _id: req.params.id }).
				then(dbModel => dbModel.remove()).
				then(dbModel => res.json(dbModel)).
				catch(err => res.status(422).json(err));
		} else {
			res.status(401).send('Not Authorized');
		}
  }
};
