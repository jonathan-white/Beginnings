import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Section } from '../../components/section';
import { Recipe } from '../../components/recipe';
import { RecipeExport } from 'src/app/components/recipe-export';

import { SectionService } from '../../services/section.service';
import { RecipeService } from '../../services/recipe.service';
import { FactService } from '../../services/fact.service';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  section: Section;
  sectionRecipes: Recipe[];
  showIntro = false;
  sortNameASC = true;
  sortDateCreatedASC = true;
  headers: RecipeExport;
  recipesFormatted: RecipeExport[] = [];
  exportTitle: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sectionService: SectionService,
    private recipeService: RecipeService,
    private factService: FactService,
    private downloadService: DownloadService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getSection(params.section);
      this.getRecipes(params.section);
      if (!sessionStorage.getItem('facts')) {
        this.factService.loadFacts();
      }

      if (sessionStorage.getItem(`hasSeenIntro_${params.section}`)) {
        this.showIntro = false;
      } else {
        this.showIntro = true;
        sessionStorage.setItem(`hasSeenIntro_${params.section}`, 'true');
      }

    });
  }

  getSection(sectionName: string): void {
    if (sessionStorage.getItem('sections')) {
      this.section = JSON.parse(sessionStorage.getItem('sections'))
        .filter(section => section.name === sectionName)[0];
      if (this.section === undefined) {
        // No section exists; Reroute to the 404 page
        this.router.navigateByUrl('/404');
      }
    } else {
      this.section = this.sectionService.getSection(sectionName);
    }
  }

  getRecipes(sectionName: string): void {
    if (sessionStorage.getItem('recipes')) {
      this.sectionRecipes = JSON.parse(sessionStorage.getItem('recipes'))
        .filter(recipe => recipe.section === sectionName);
    } else {
      this.recipeService.getSectionRecipes(sectionName)
        .subscribe(sectionRecipes => {
          // console.log(`section.component.ts | getRecipes | ${sectionName} recipes: `, recipes);
          this.sectionRecipes = sectionRecipes;
        });
    }
  }

  sortByTitle(): void {
    this.sortDateCreatedASC = true;
    this.sortNameASC = !this.sortNameASC;
    this.sectionRecipes = this.sectionRecipes.sort((a, b) => {
      switch (this.sortNameASC) {
        case true:
          if (a.displayName < b.displayName) {
            return -1;
          }
          if (a.displayName > b.displayName) {
            return 1;
          }
          break;
        case false:
          if (a.displayName > b.displayName) {
            return -1;
          }
          if (a.displayName < b.displayName) {
            return 1;
          }
        break;
        default:
      }
      return 0;
    });
  }

  sortByDateCreated(): void {
    this.sortNameASC = true;
    this.sortDateCreatedASC = !this.sortDateCreatedASC;
    this.sectionRecipes = this.sectionRecipes.sort((a, b) => {
      switch (this.sortDateCreatedASC) {
        case true:
          if (a.dateCreated < b.dateCreated) {
            return -1;
          }
          if (a.dateCreated > b.dateCreated) {
            return 1;
          }
          break;
        case false:
          if (a.dateCreated > b.dateCreated) {
            return -1;
          }
          if (a.dateCreated < b.dateCreated) {
            return 1;
          }
        break;
        default:
      }
      return 0;
    });
  }

  download(fileType: string): void {
    // Clear prior data
    this.recipesFormatted = [];

    // Format the data
    this.sectionRecipes.forEach((item) => {
      this.recipesFormatted.push({
        title: item.displayName.replace(/,/g, ''),
        section: item.section,
        rating: item.rating,
        page: item.foundOnPage
      });
    });

    // Set the headers
    this.headers = {
      title: 'Title'.replace(/,/g, ''),
      section: 'Section',
      rating: 'Rating',
      page: 'Page Number'
    };

    // Set the file's filename
    this.exportTitle = `${this.section.name}_recipes`;

    switch (fileType) {
      case 'CSV':
        this.downloadService.exportCSVFile(this.headers, this.recipesFormatted, this.exportTitle);
        break;
      case 'XLS':
        this.downloadService.exportExcelFile(this.headers, this.recipesFormatted, this.exportTitle);
        break;
      default:
        this.downloadService.exportCSVFile(this.headers, this.recipesFormatted, this.exportTitle);
        break;
    }
  }

  skipIntro(): void {
    this.showIntro = false;
  }
}
