import {CoreAction} from "../../../core/state/model/core.action.model";
import {CommonUtils} from "../../../core/utils/common.utils";
import {GetRecipeListResponse} from "../../../../../mock/backend-api/model/getRecipeListResponse";
import {
  RECEIVE_RECIPE_ADD_FAVORITE, RECEIVE_RECIPE_DELETE,
  RECEIVE_RECIPE_LIST, RECIPE_FORM_CHANGE, SELECTED_RECIPE,
} from "../action/recipe.action-factory";
import {NewRecipeModel} from "../../../../../mock/backend-api/model/new-recipe.model";
import {RecipeState} from "../model/recipe.state.model";
import {Recipe} from "../../../../../mock/backend-api/model/recipe.model";
import {AddNewRecipeRequest} from "../../../../../mock/backend-api/model/addNewRecipeRequest";

export function recipeReducer (state: RecipeState, action: CoreAction<any>): RecipeState {
  if (!state) {
    state = {
       recipeList: [],
       selectedRecipe: null,
       newRecipeFormRequest: clearNewRecipeFormState()
    }
  }

  switch (action.type) {
    case RECEIVE_RECIPE_LIST:
      return receiveGetRecipeList(state, action.payload);
    case RECEIVE_RECIPE_ADD_FAVORITE:
      return receiveRecipeAddToFavorite(state, action.payload);
    case RECEIVE_RECIPE_DELETE:
      return receiveReceiveRecipeDelete(state, action.payload);
    case RECIPE_FORM_CHANGE:
      return recipeFormChange(state, action.payload);
    case SELECTED_RECIPE:
      return selectedRecipe(state, action.payload);

    default:
      return state;
  }

  // Get list

  function receiveGetRecipeList(originalState: RecipeState, response: GetRecipeListResponse): RecipeState {
    let changes: RecipeState = {
      recipeList: response ? CommonUtils.clone(response) : [],
    };
    return changeState(originalState, changes);
  }

  // Add favorite

  function receiveRecipeAddToFavorite(originalState: RecipeState, recipe: Recipe): RecipeState {
    let updatedList: Array<Recipe> = CommonUtils.clone(originalState.recipeList) || [];
    updatedList = updatedList.map(item => item.id !== recipe.id ? item : recipe);
    let changes: RecipeState = {
      recipeList: updatedList
    };
    return changeState(originalState, changes);
  }

  // New recipe form change

  function recipeFormChange(originalState: RecipeState, request: AddNewRecipeRequest): RecipeState {
    let recipe: NewRecipeModel = {
      title: request.title,
      subTitle: request.subTitle,
      bakeParam: {
        time: {
          hour: request.bakeParam.time.hour ? request.bakeParam.time.hour : null,
          minute: request.bakeParam.time.minute ? request.bakeParam.time.minute : null,
        },
        temperature: request.bakeParam.temperature ? request.bakeParam.temperature : null,
      },
      ingredients: request.ingredients ? request.ingredients : [],
      category: request.category,
      favorite: request.favorite ? request.favorite : false
    };
    let changes: RecipeState = {
      newRecipeFormRequest: recipe
    }
    return changeState(originalState, changes);
  }

  // Delete
  function receiveReceiveRecipeDelete(originalState: RecipeState, recipe: Recipe): RecipeState{
    let filteredRecipeList = CommonUtils.clone(originalState.recipeList) || [];
    filteredRecipeList = filteredRecipeList.filter(item => item.id !== recipe.id);

    let changes: RecipeState = {
      recipeList: filteredRecipeList,
    };

    return changeState(originalState, changes);
  }

  // Open recipe

  function selectedRecipe(originalState: RecipeState, recipe: Recipe): RecipeState{
    let selectedRecipe: Recipe = CommonUtils.clone(recipe)
    let changes: RecipeState = {
      selectedRecipe: selectedRecipe,
    };

    return changeState(originalState, changes);
  }

  function changeState(originalState: RecipeState, changes: RecipeState): RecipeState {
    return Object.assign({}, originalState, changes);
  }

  function clearNewRecipeFormState(): NewRecipeModel {
    return {
      title: "",
      subTitle: "",
      bakeParam: {
        time: {
          hour: null,
          minute: null
        },
        temperature: null,
      },
      ingredients: [],
      category: null,
      favorite: false,
    };
  }
}
