
import {RecipeListState} from "../model/recipeList.state.model";
import {CoreAction} from "../../../core/state/model/core.action.model";
import {RECEIVE_RECIPE_LIST, REQUEST_RECIPE_LIST} from "../action/main-page.action-factory";
import {GetRecipeListRequest} from "../../../../../mock/backend-api/model/getRecipeListRequest";
import {CommonUtils} from "../../../core/utils/common.utils";
import {GetRecipeListResponse} from "../../../../../mock/backend-api/model/getRecipeListResponse";

export function mainPageReducer (state: RecipeListState, action: CoreAction<any>): RecipeListState {
  if (!state) {
    state = {
       recipeListRequest: clearRecipeListRequestState(),
       recipeList: [],
       selectedRecipe: null
    }
  }

  switch (action.type) {
    case REQUEST_RECIPE_LIST:
      return requestGetRecipeList(state, action.payload);
    case RECEIVE_RECIPE_LIST:
      return receiveGetRecipeList(state, action.payload);
    default:
      return state;
  }

  function requestGetRecipeList(originalState: RecipeListState, request: GetRecipeListRequest): RecipeListState {
    let changes: RecipeListState = {
      recipeListRequest: CommonUtils.clone(request)
    };
    return changeState(originalState, changes);
  }

  function receiveGetRecipeList(originalState: RecipeListState, response: GetRecipeListResponse): RecipeListState {
    let changes: RecipeListState = {
      recipeList: response  ? CommonUtils.clone(response) : [],
      selectedRecipe: null,
    };
    return changeState(originalState, changes);
  }

  function clearRecipeListRequestState(): GetRecipeListRequest {
    return {
      category: null
    };
  }
  function changeState(originalState: RecipeListState, changes: RecipeListState): RecipeListState {
    return Object.assign({}, originalState, changes);
  }
}
