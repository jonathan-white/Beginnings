import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../../components/recipe';
import { Ingredient } from '../../components/ingredient';

import { RecipeService } from '../../services/recipe.service';
import { IngredientService } from 'src/app/services/ingredient.service';

import * as moment from 'moment';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  recipeId: string;

  sections = ['casual', 'classic', 'elegant'];

  servingTemps = ['hot', 'cold', 'warm', 'room temp'];

  ratings = [0, 1, 2, 3, 4, 5];

  categories = ['Salsa', 'Dip'];

 // TODO: Use this on the Add New Recipe page
  model = new Recipe;

  recipe: Recipe;

  recipeTitle = '';

  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipeId = params['recipeId'];
      this.getRecipe(params['recipeId']);
    });
  }

  // ****************************
  // ** General Methods */
  // ****************************

  onSubmit() {
    this.submitted = true;
    this.postRecipe({...this.recipe, dateModified: moment().format()});
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.recipe); }

  get dateCreated() { return this.recipe.dateCreated ? moment(this.recipe.dateCreated).format('MMMM Do YYYY, h:mm:ss a') : 'N/A'; }

  get dateModified() { return this.recipe.dateModified ? moment(this.recipe.dateModified).format('MMMM Do YYYY, h:mm:ss a') : 'N/A'; }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  clear(obj: any) {
    obj.value = '';
  }

  // ****************************
  // ** Recipes Methods */
  // ****************************

  getRecipe(recipeId: string): void {
    this.recipeService.getRecipeById(recipeId)
      .subscribe(recipe => {
        if (!recipe) {
          // No recipe exists; Reroute to the 404 page
          this.router.navigateByUrl('/404');
        }
        this.recipe = recipe;

        console.log('edit-recipe.component.ts | getRecipe | current recipe: ', recipe);
      });
  }

  postRecipe(recipeData: any): void {
    this.recipeService.addOrUpdateRecipe(recipeData)
      .subscribe(recipe => {
        if (!recipe) {
          // No recipe exists; Reroute to the 404 page
          // console.log('No Recipe exists; Suggest rerouting to 404 page');
          this.router.navigateByUrl('/404');
        }
        this.recipe = recipe;
        console.log('edit-recipe.component.ts | postRecipe | current recipe: ', recipe);

        // Update SessionStorage
        const allRecipes = JSON.parse(sessionStorage.getItem('recipes'));
        console.log(`SessionStorage recipes(${typeof allRecipes}):`, allRecipes);
        // allRecipes.push(recipe);
        // sessionStorage.setItem('recipes', JSON.stringify(allRecipes));

      });
  }

  newRecipe() {
    this.recipe = new Recipe;
    // TODO: Create a new recipe entry in the database
  }

  // ****************************
  // ** Ingredient Methods */
  // ****************************

  newIngredient(ingName: string) {
    console.log('Add New Ingredient');

    // TODO: will not work if the recipe ID does not exist (i.e. if the recipe has not been saved to the DB)
    const dateNow = moment().format();
    const newIng = {
      recipeId: this.recipe._id,
      description: [ingName],
      displayName: ingName,
      item: '',
      qty: 0,
      unit: '',
      dateCreated: dateNow,
      dateModified: dateNow
    };

    this.ingredientService.createIngredient(newIng)
      .subscribe(updatedRecipe => {
        const id = updatedRecipe.ingredients.find(i => moment(i.dateCreated).format() === dateNow)._id;
        this.recipe.ingredients = updatedRecipe.ingredients;
      });
  }

  saveIngredient(data: any) {
    this.ingredientService.updateIngredient(data._id, data)
      .subscribe();
  }

  deleteIngredient(id: string) {
    // Remove edit mode for the selected ingredient
    // this.editMode.ingredients.list = this.editMode.ingredients.list.filter(i => i !== id);
    // console.log(`recipe.component.ts | deleteIngredient | Delete Ingredient: ${id}`);
    this.recipe.ingredients = this.recipe.ingredients.filter(i => i._id !== id);
    // Delete Ingredient record from the database
    this.ingredientService.deleteIngredient(id).subscribe();
  }

  // ****************************
  // ** Instruction Methods */
  // ****************************

  newInstruction(data: string) {
    this.recipe.instructions.push(data);
  }

  saveInstruction(data: any) {
    console.log('TODO: Update Instructions with: ', data);
  }

  deleteInstruction(index: any) {
    this.recipe.instructions.splice(index, 1);
  }
}
