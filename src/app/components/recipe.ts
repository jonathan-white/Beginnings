import { Ingredient } from './ingredient';
import { Duration } from './duration';

export class Recipe {
  _id: string;
  displayName: string;
  techTitle: string;
  section: string;
  images: string[];
  ingredients: Ingredient[];
  instructions: string[];
  servingTemp: string;
  equipment: [];
  yieldInServings: number;
  rating: number;
  keywords: [];
  category: string;
  subcategory: string;
  pairings: [];
  foundOnPage: number;
  dateCreated: string;
  dateModified: string;
  duration: Duration;
}
