import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import { Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private  recipes: Recipe[] = [
 //   new Recipe('Red Sauce Spagetti',
   //   'This is the recipe for red sauce spagetti pasta',
    //  'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fassets.marthastewart.com%2Fstyles%2Fwmax-300%2Fd23%2Fmsledf_0304_spag_3sauce%2Fmsledf_0304_spag_3sauce_vert.jpg%3Fitok%3DPLEwhwtS',
    //  [
    //    new Ingredient('Pasta', 3),
    //    new Ingredient('Pasta Sauce', 2),
     //   new Ingredient('water', 5)
    //  ]),
  //  new Recipe('Chicken Biryani',
   //   'This is the recipe for chicken biryani',
    //  'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/02/chicken-biryani-recipe-500x500.jpg',
    //  [
    //    new Ingredient('chicken', 1),
    //    new Ingredient('rice', 2),
     //   new Ingredient('biryani masala',  1)
    //  ])
];
  constructor(private shoppingListService: ShoppingListService) {
  }
    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }
    getRecipes() {
      return this.recipes.slice();
    }
    getRecipe(id: number) {
       return this.recipes.slice() [id];
    }
    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients);
    }
}
