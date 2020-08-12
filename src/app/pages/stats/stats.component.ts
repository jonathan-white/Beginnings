import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../../components/recipe';
import { Ingredient } from '../../components/ingredient';

import { RecipeService } from '../../services/recipe.service';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  recipes: Recipe[];
  ingredients: Ingredient[];
  sections: ['casual', 'classic', 'elegant'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
  ) { }

  ngOnInit() {
    this.recipes = [];
    this.ingredients = [];
    this.getAllRecipes();
    this.getAllIngredients();
  }

  getAllRecipes(): void {
    this.recipeService.getAllRecipes()
      .subscribe(recipes => {
        if (!recipes) {
          // No recipes exist; Reroute to the 404 page
          // this.router.navigateByUrl('/404');
        }
        this.recipes = recipes;

        console.log('stats.component.ts | getAllRecipes | recipes: ', recipes);
      });
  }

  getAllIngredients(): void {
    this.ingredientService.getAllIngredients()
      .subscribe(ingredients => {
        if (!ingredients) {
          // No ingredients exist;
        }
        this.ingredients = ingredients;
        console.log('stats.component.ts | getAllIngredients | ingredients: ', ingredients);
      });
  }

  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  recipeCount(section: any) { return section ? this.recipes.filter(r => r.section === section).length : this.recipes.length; }

  ingredientCount(section: any) {
    const initialValue = 0;
    return section ? this.recipes
      .filter(r => r.section === section)
      .map(r => r.ingredients.length)
      .reduce((total, count) => total + count, initialValue) : this.ingredients.length;
  }

  stepCount(section: any) {
    const initialValue = 0;
    return section ?
      this.recipes
        .filter(r => r.section === section)
        .map(r => r.instructions.filter(step => step.length > 0).length)
        .reduce((total, count) => total + count, initialValue) :
      this.recipes
        .map(r => r.instructions.filter(step => step.length > 0).length)
        .reduce((total, count) => total + count, initialValue);
  }

  recipesWithInstructionsCount(section: any) {
    const initialValue = 0;
    return section ?
      this.recipes
        .filter(r => r.section === section)
        .map(r => r.instructions.filter(step => step.length > 0).length)
        .reduce((total, count) => total + count, initialValue) :
      this.recipes
        .map(r => r.instructions.filter(step => step.length > 0).length)
        .reduce((total, count) => total + count, initialValue);
  }

  recipesWithIngredients(threshold: number) { return this.recipes.filter(r => r.ingredients.length > threshold).length; }

  get ingredientsWithDescriptions() { return this.ingredients.filter(i => i.description.filter(d => d.length > 0)).length; }

  recipesWithInstructions(threshold: number) { return this.recipes.filter(r => r.instructions.length > threshold).length; }


  editRecipe(id: string) {
    this.router.navigateByUrl(`/recipes/edit/${id}`);
  }

  ingAttrCounts(ingList: any, attr: string) {
    return ingList.filter(i => i[attr]).length;
  }

  ingDisplayNameCounts(ingList: any) {
    return ingList.filter(i => i.displayName).length;
  }

  ingItemCounts(ingList: any) {
    return ingList.filter(i => i.item).length;
  }

  ingUnitCounts(ingList: any) {
    return ingList.filter(i => i.unit).length;
  }

  ingQtyCounts(ingList: any) {
    return ingList.filter(i => i.qty).length;
  }

  ingRecipeIDCounts(ingList: any) {
    return ingList.filter(i => i.recipeId).length;
  }

  ingDescriptionCounts(ingList: any) {
    return ingList.filter(i => i.description[0]).length;
  }

  stepCounts(stepsList: any) {
    return stepsList.filter(step => step.length > 0).length;
  }
}
