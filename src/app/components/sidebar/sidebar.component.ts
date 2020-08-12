import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() recipeList: Recipe[];
  @Input() section: string;
  @Input() search = '';
  @Input() activeRecipe: string;
  hideList = false;

  constructor() { }

  ngOnInit() {
  }

  toggleList(): void {
    this.hideList = !this.hideList;
  }

  clearFilter(): void {
    this.search = '';
  }

}
