const db = require('../models');
const keys = require("../keys");

module.exports = {
  findAll: (req, res) => {
		// console.log(req.body);
    db.Section.
      find({}).
      sort({ name: 1 }).
      then(dbModel => res.json(dbModel)).
      catch(err => res.status(422).json(err));
	},
  findByName: function(req, res) {
    db.Section.
      findOne({ name: req.params.key}).
      then(dbModel => res.json(dbModel)).
      catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
		if(req.get('Authorization') === keys.api_key){
			db.Section.
				create(req.body).
				then(dbModel => res.json(dbModel)).
				catch(err => res.status(422).json(err));
		} else {
			res.status(401).send('Not Authorized');
		}
  },
  update: function(req, res) {
		if(req.get('Authorization') === keys.api_key){
			db.Section.
				findOneAndUpdate({ _id: req.params.id }, req.body).
				then(dbModel => 
					db.Section.
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
			db.Section.
				findById({ _id: req.params.id }).
				then(dbModel => dbModel.remove()).
				then(dbModel => res.json(dbModel)).
				catch(err => res.status(422).json(err));
		} else {
			res.status(401).send('Not Authorized');
		}
	}
};
