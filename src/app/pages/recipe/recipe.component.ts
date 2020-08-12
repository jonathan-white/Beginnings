import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Recipe } from '../../components/recipe';
import { Fact } from '../../components/fact';
import { RecipeObj } from '../../components/recipe-obj';
import { Ingredient } from '../../components/ingredient';

import { RecipeService } from '../../services/recipe.service';
import { FactService } from '../../services/fact.service';
import { IngredientService } from 'src/app/services/ingredient.service';

import * as moment from 'moment';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: Recipe;
  fact: Fact;
  recipePath: RecipeObj;
  sectionRecipes: Recipe[];
  instructions: string[];
  ingredients: Ingredient[];
  editMode = {
    instructions: {
      active: false,
      width: 694,
      height: 140
    },
    ingredients: {
      active: false,
      list: []
    },
    duration: {
      active: false,
      list: []
    }
  };
  canDisplayRecipe = false;
  modalControl = {
    showModal: false,
    expandSection: {
      misc: true,
      ingredients: true,
      instructions: true
    }
  };
  foundItems = [];
  watchoutsCheckPerformed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private factService: FactService,
    private ingredientService: IngredientService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipePath = {
        section: params['section'],
        title: params['recipe']
      };
      this.getRecipe(this.recipePath);
      this.getRandomFact();

      if (sessionStorage.getItem('recipes')) {
        this.sectionRecipes = JSON.parse(sessionStorage.getItem('recipes'))
          .filter(recipe => recipe.section === params['section']);
      }

    });
  }

  getRecipe(recipePath: RecipeObj): void {
    this.recipeService.getRecipe(recipePath)
      .subscribe(recipe => {
        if (!recipe) {
          // No recipe exists; Reroute to the 404 page
          this.router.navigateByUrl('/404');
        }
        this.recipe = recipe;
        this.instructions = recipe.instructions;
        this.ingredients = recipe.ingredients;
        this.canDisplayRecipe = this.recipe.instructions
          .map(i => i.length).reduce((total, iLength) => total + iLength) > 0 ||
          this.recipe.ingredients.length > 0;
        this.foundItems = [];
        this.watchoutsCheckPerformed = false;

        console.log('recipe.component.ts | getRecipe | current recipe: ', recipe);
      });
  }

  updateRecipe(recipeData: any): void {
    this.recipeService.updateRecipe({...recipeData, _id: this.recipe._id})
      .subscribe(recipe => {
        if (!recipe) {
          // No recipe exists; Reroute to the 404 page
          this.router.navigateByUrl('/404');
        }
        this.recipe = recipe;
        // console.log('recipe.component.ts | updateRecipe | current recipe: ', recipe);
      });
  }

  // Instructions Methods
  addInstructionStep(): void {
    // console.log('recipe.component.ts | addInstructionStep | new instruction step');
    this.recipe.instructions.push('');
  }

  deleteInstructionStep(index: any): void {
    this.recipe.instructions.splice(index, 1);
  }

  // Ingredients Methods
  addIngredient(): void {
    const dateNow = moment().format();
    const newIng = {
      recipeId: this.recipe._id,
      description: [''],
      displayName: '',
      item: '',
      qty: 0,
      unit: '',
      dateCreated: dateNow,
      dateModified: dateNow
    };

    this.ingredientService.createIngredient(newIng)
      .subscribe(updatedRecipe => {
        // console.log('recipe.component.ts | addIngredient | updatedRecipe.ingredients: ', updatedRecipe.ingredients);
        const id = updatedRecipe.ingredients.find(i => moment(i.dateCreated).format() === dateNow)._id;
        this.editMode.ingredients.list.push(id);
        this.recipe.ingredients = updatedRecipe.ingredients;
      });
  }

  editIngredient(id: any): void {
    // console.log(`recipe.component.ts | editIngredient | Edit Ingredient: ${id}`);
    // Toggle edit mode for the selected ingredient
    this.editMode.ingredients.list.push(id);
  }

  saveIngredient(id: any): void {
    // console.log(`recipe.component.ts | saveIngredient | Save Ingredient: ${id}`);
    const ingredient = this.recipe.ingredients.filter(i => i._id === id)[0].description;
    const quantity = this.recipe.ingredients.filter(i => i._id === id)[0].qty;
    const ingredient_item = this.recipe.ingredients.filter(i => i._id === id)[0].item;
    const unit = this.recipe.ingredients.filter(i => i._id === id)[0].unit;

    if (ingredient[0].trim().length > 0) {

      // Prep the data object
      const ingredientData = {
        description: ingredient,
        displayName: ingredient[0],
        qty: quantity,
        item: ingredient_item,
        unit: unit
      };

      // Remove edit mode for the selected ingredient
      this.editMode.ingredients.list = this.editMode.ingredients.list.filter(i => i !== id);

      // console.log(`recipe.component.ts | saveIngredient | ingredientData:`, ingredientData);
      // Update Ingredient record in the database
      // No need to return the updated ingredient since the state recipe object has
      // already been updated to reflect the changes.
      this.ingredientService.updateIngredient(id, ingredientData)
        .subscribe();
    } else {
      this.removeIng(id);
    }
  }

  deleteIngredient(id: any): void {
    this.removeIng(id);
  }

  removeIng(id: any): void {
    // Remove edit mode for the selected ingredient
    this.editMode.ingredients.list = this.editMode.ingredients.list.filter(i => i !== id);
    // console.log(`recipe.component.ts | deleteIngredient | Delete Ingredient: ${id}`);
    this.recipe.ingredients = this.recipe.ingredients.filter(i => i._id !== id);
    // Delete Ingredient record from the database
    this.ingredientService.deleteIngredient(id).subscribe();
  }

  // Fact Methods
  getRandomFact(): void {
    if (this.factService.facts) {
      this.fact = this.factService.facts[Math.floor(Math.random() * this.factService.facts.length)];
    } else {
      this.factService.getFacts()
        .subscribe(facts => {
          this.fact = facts[Math.floor(Math.random() * facts.length)];
        });
    }
  }

  toggleEdit(property: string): void {
    const el: HTMLElement = document.querySelector('.recipe-instructions p');
    this.editMode[property].width = el !== null ? el.offsetWidth : this.editMode[property].width;
    this.editMode[property].height = el !== null ? el.offsetHeight : this.editMode[property].height;
    this.editMode[property].active = !this.editMode[property].active;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  has(query: any): boolean {
    if (this.watchoutsCheckPerformed && this.foundItems.length > 0) {
      return true;
    } else if (this.watchoutsCheckPerformed) {
      return false;
    }
    let found = false;

    // If query is a string, loop through the ingredients list to determine
    // if there is a match.
    if (typeof query === 'string') {
      for (let i = 0; i < this.recipe.ingredients.length; i++) {
        if (this.recipe.ingredients[i].item.toLowerCase().includes(query.toLowerCase())) {
          found = true;
          this.foundItems.push(query.toLowerCase());
          break;
        }
      }
    }

    // If query is an Array, loop through each array item to see if it is located
    // within the ingredients list
    if (query instanceof Array) {
      for (let i = 0; i < query.length; i++) {
        for (let j = 0; j < this.recipe.ingredients.length; j++) {
          if (this.recipe.ingredients[j].item.toLowerCase().includes(query[i].toLowerCase())) {
            found = true;
            this.foundItems.push(query[i].toLowerCase());
            break;
          }
        }
      }
    }

    this.watchoutsCheckPerformed = true;
    return found;
  }

  toggleRecipeModal(): void {
    this.modalControl.showModal = !this.modalControl.showModal;
  }

  expand(target: string): void {
    const el = document.querySelector(`.section-${target} .section-content`);
    el.classList.toggle('content-expanded');
    this.modalControl.expandSection[target] = !this.modalControl.expandSection[target];
  }

  showRecipe(): void {
    this.canDisplayRecipe = true;
  }

}
