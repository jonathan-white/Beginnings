import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { OurBeginningsComponent } from './pages/our-beginnings/our-beginnings.component';
import { TastersComponent } from './pages/tasters/tasters.component';
import { ContributorsComponent } from './pages/contributors/contributors.component';
import { FoodsInBloomComponent } from './pages/foods-in-bloom/foods-in-bloom.component';
import { ComplementsComponent } from './pages/complements/complements.component';
import { StoreComponent } from './pages/store/store.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { SectionComponent } from './pages/section/section.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { EditRecipeComponent } from './pages/edit-recipe/edit-recipe.component';
import { StatsComponent } from './pages/stats/stats.component';

import { RouteGuard } from './guards/route.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [RouteGuard] },
  { path: 'credits', component: CreditsComponent, canActivate: [RouteGuard] },
  { path: 'our-beginnings', component: OurBeginningsComponent, canActivate: [RouteGuard] },
  { path: 'tasters', component: TastersComponent, canActivate: [RouteGuard] },
  { path: 'contributors', component: ContributorsComponent, canActivate: [RouteGuard] },
  { path: 'foods-in-bloom', component: FoodsInBloomComponent, canActivate: [RouteGuard] },
  { path: 'complements', component: ComplementsComponent, canActivate: [RouteGuard] },
  { path: 'store', component: StoreComponent, canActivate: [RouteGuard] },
  { path: 'recipes/edit/:recipeId', component: EditRecipeComponent, canActivate: [RouteGuard] },
  { path: 'recipes/:section/:recipe', component: RecipeComponent, canActivate: [RouteGuard] },
  { path: 'recipes/:section', component: SectionComponent, canActivate: [RouteGuard] },
  { path: 'admin/stats', component: StatsComponent, canActivate: [RouteGuard] },
  { path: 'searchResults', component: SearchResultsComponent, canActivate: [RouteGuard] },
  { path: '404', component: PageNotFoundComponent, canActivate: [RouteGuard] },
  { path: '**', component: PageNotFoundComponent, canActivate: [RouteGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
