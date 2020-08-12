import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './pages/home/home.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { OurBeginningsComponent } from './pages/our-beginnings/our-beginnings.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeSearchComponent } from './components/recipe-search/recipe-search.component';
import { TastersComponent } from './pages/tasters/tasters.component';
import { ContributorsComponent } from './pages/contributors/contributors.component';
import { FoodsInBloomComponent } from './pages/foods-in-bloom/foods-in-bloom.component';
import { ComplementsComponent } from './pages/complements/complements.component';
import { StoreComponent } from './pages/store/store.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { SectionComponent } from './pages/section/section.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { EditRecipeComponent } from './pages/edit-recipe/edit-recipe.component';
import { StatsComponent } from './pages/stats/stats.component';
import { SectionFilterPipe } from './pipes/section-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    NavbarComponent,
    CreditsComponent,
    OurBeginningsComponent,
    RecipeSearchComponent,
    TastersComponent,
    ContributorsComponent,
    FoodsInBloomComponent,
    ComplementsComponent,
    StoreComponent,
    RecipeComponent,
    SectionComponent,
    SearchResultsComponent,
    PageNotFoundComponent,
    SidebarComponent,
    FilterPipe,
    FooterComponent,
    EditRecipeComponent,
    StatsComponent,
    SectionFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
