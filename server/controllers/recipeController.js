const db = require('../models');
const keys = require("../keys");

module.exports = {
  findAll: (req, res) => {
    db.Recipe.
      find({}).
      populate({
				path: 'ingredients',
				select: 'item qty unit description',
				options: {
					sort: {
						'dateCreated': 1
					}
				}
			}).
      sort({ displayName: 1 }).
      then(dbModel => res.json(dbModel)).
      catch(err => res.status(422).json(err));
	},
	matchRecipes: (req, res) => {
    db.Recipe
      .find({ 
        displayName: { $regex: req.query.q, $options: "i" } 
      })
      .populate({
        path: 'ingredients',
        select: 'item qty unit description',
        options: {
          sort: {
            'dateCreated': 1
          }
        }
      })
      .sort({ displayName: 1 })
      .limit(parseInt(req.query.limit))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findbySectionAndTechTitle: (req, res) => {
    db.Recipe.
      findOne({ section: req.params.section, techTitle: req.params.title }).
      populate({
        path: 'ingredients',
        select: 'item qty unit description',
        options: {
          sort: {
            'dateCreated': 1
          }
        }
      }).
      sort({ displayName: 1 }).
      then(dbModel => {
        res.json(dbModel);
      }).
      catch(err => res.status(422).json(err));
	},
  findBySection: (req, res) => {
    db.Recipe.
      find({ section: req.params.section }).
      populate({
        path: 'ingredients',
        select: 'item qty unit description',
        options: {
          sort: {
            'dateCreated': 1
          }
        }
      }).
      sort({ dateCreated: 1 }).
      then(dbModel => res.json(dbModel)).
      catch(err => res.status(422).json(err));
	},
  findById: function(req, res) {
    db.Recipe.
      findById({ _id: req.params.id}).
      populate('ingredients').
      then(dbModel => res.json(dbModel)).
      catch(err => res.status(422).json(err));
  },
  findByTechTitle: function(req, res) {
    db.Recipe
      .findOne({ techTitle: req.params.title})
      .populate({
        path: 'ingredients',
        select: 'item qty unit description',
        options: {
          sort: {
            'dateCreated': 1
          }
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
		if(req.get('Authorization') === keys.api_key){
			db.Recipe.
				create(req.body).
				then(dbModel => res.json(dbModel)).
				catch(err => res.status(422).json(err));
		} else {
      console.log(res);
			res.status(401).send('Not Authorized');
		}
  },
  update: function(req, res) {
		if(req.get('Authorization') === keys.api_key){
			db.Recipe.
				findOneAndUpdate({ _id: req.params.id }, req.body).
				then(dbModel => 
					db.Recipe.
						findOne({ _id: dbModel._id}).
						populate('ingredients').
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
			db.Recipe.
				findById({ _id: req.params.id }).
				populate('ingredients').
				then(dbModel => dbModel.remove()).
				then(dbModel => res.json(dbModel)).
				catch(err => res.status(422).json(err));
		} else {
			res.status(401).send('Not Authorized');
		}
	}
};
