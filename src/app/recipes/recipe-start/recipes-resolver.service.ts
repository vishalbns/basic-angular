import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import { Recipe } from '../recipe.model';
import {DataStorageService} from '../../shared/data-storage.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {RouterStateSnapshot} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Injectable()
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if ( recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
