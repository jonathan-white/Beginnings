const db = require('../models');
const keys = require("../keys");

module.exports = {
  findAll: (req, res) => {
    db.Ingredient.
      find({}).
      sort({ _id: 1 }).
      then(dbModel => res.json(dbModel)).
      catch(err => res.status(422).json(err));
	},
	findIngredients: (req, res) => {
		if(req.query.apiKey === keys.api_key){
			db.Ingredient.
				find({ item: { $regex: req.query.q, $options: "i" } }).
				sort({ item: 1 }).
				then(dbModel => res.json(dbModel)).
				catch(err => res.status(422).json(err));
		} else {
			res.status(401).send('Not Authorized');
		}
	},
  findById: function(req, res) {
    db.Ingredient.
      findById({ _id: req.params.id}).
      then(dbModel => res.json(dbModel)).
      catch(err => res.status(422).json(err));
  },
  findByRecipe: function(req, res) {
    db.Ingredient.
      find({ recipeId: req.params.recipeId }).
      sort({ dateCreated: 1 }).
      then(dbModel => res.json(dbModel)).
      catch(err => res.status(422).json(err));
  },
	create: function(req, res) {
		if(req.get('Authorization') === keys.api_key){
			db.Ingredient.
				create(req.body).
				then(dbIngredient => {
					return db.Recipe.findOneAndUpdate(
						{ _id: req.body.recipeId},
						{ $push: { "ingredients": dbIngredient._id } },
            { new: true })
            .populate({
              path: 'ingredients',
              select: 'item qty unit description displayName dateCreated',
              options: {
                sort: {
                  'dateCreated': 1
                }
              }
            });
				}).
				then(dbModel => res.json(dbModel)).
				catch(err => res.status(422).json(err));
		} else {
			res.status(401).send('Not Authorized');
		}
  },
  update: function(req, res) {
		if(req.get('Authorization') === keys.api_key){
			db.Ingredient.
				findOneAndUpdate({ _id: req.params.id }, req.body).
				then(dbModel => 
					db.Ingredient.
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
			db.Ingredient.
				findById({ _id: req.params.id }).
				then(dbModel => dbModel.remove()).
				then(dbModel => res.json(dbModel)).
				catch(err => res.status(422).json(err));
		} else {
			res.status(401).send('Not Authorized');
		}
  }
};
