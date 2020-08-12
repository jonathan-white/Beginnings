import { Component, OnInit } from '@angular/core';

import { IMAGES_HOME } from '../../components/images-home';

import { SectionService } from '../../services/section.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Beginnings';
  akronImages = IMAGES_HOME;

  constructor(
    private sectionService: SectionService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.sectionService.getSections();
    this.recipeService.getAllRecipes();
  }
}
