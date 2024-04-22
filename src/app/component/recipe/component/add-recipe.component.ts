import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import ResourceService, {ResourceServiceToken} from "../../../core/resource/service/resource.service";
import {UnitEnumValue, UnitEnumValuesToken} from "../model/unit.enum";
import { RecipeCategoryEnumValue, RecipeCategoryEnumValuesToken} from "../model/recipe-category.enum";
import {CommonUtils} from "../../../core/utils/common.utils";
import {RecipeActionFactory, RecipeActionFactoryToken} from "../action/recipe.action-factory";
import {debounceTime, Subscription} from "rxjs";
import {FORM_DEBOUNCE_TIME} from "../../../core/state/model/core.action.model";
import {Store} from "@ngrx/store";
import {RecipeState, selectRecipeListState} from "../model/recipe.state.model";
import {AddNewRecipeRequest} from "../../../../../mock/backend-api/model/addNewRecipeRequest";

@Component({
  selector: 'b-add-recipe',
  template: `
    <div class="b-add-recipe-container">
      <form [formGroup]="formGroup" id="addRecipeForm" class="add-recipe-form">
        <span class="add-recipe-row title-category-wrapper">
          <div class="input-error-container">
            <input class="p-input title-input-field" pInputText placeholder="{{'ADD_RECIPE.FIELD.TITLE.LABEL' | resolve}}" formControlName="title"/>
            <small *ngIf="hasError('title')" class="p-error add-recipe-form-error-message">{{ "ADD_RECIPE.FIELD.ERROR.MESSAGE" | resolve }}</small>
          </div>
          <input class="p-input subtitle-input-field" pInputText  placeholder="{{'ADD_RECIPE.FIELD.SUBTITLE.LABEL' | resolve}}" formControlName="subTitle"/>
          <p-toggleButton class="favorite-icon" onIcon="pi pi-heart-fill" offIcon="pi pi-heart" formControlName="favorite"></p-toggleButton>
        </span>

        <span class="category-bake-param-wrapper">
          <div class="input-error-container">
            <p-dropdown class="recipe-category-dropdown" [options]="recipeCategoryEnumValues" formControlName="category" placeholder="{{'ADD_RECIPE.FIELD.CATEGORY.LABEL' | resolve}}"></p-dropdown>
            <small *ngIf="hasError('category')" class="p-error add-recipe-form-error-message">{{ "ADD_RECIPE.FIELD.ERROR.MESSAGE" | resolve }}</small>
          </div>
          <div class="bake-param-container" formGroupName="bakeParam">
            <div formGroupName="time" class="time-container p-input">
              <div class="p-input p-inputgroup bake-param-inputgroup">
                <p-inputNumber class="hour-input time-input" formControlName="hour"/>
                <i class="p-input p-inputgroup-addon">{{'ADD_RECIPE.FIELD.TIME.HOUR.LABEL' | resolve}}</i>
              </div>
              <div class="p-inputgroup bake-param-inputgroup">
                <p-inputNumber class="p-input minute-input  time-input" formControlName="minute"/>
                <i class="p-inputgroup-addon">{{'ADD_RECIPE.FIELD.TIME.MINUTE.LABEL' | resolve}}</i>
              </div>
            </div>
            <div class="p-inputgroup bake-param-inputgroup">
              <p-inputNumber class="p-input" id="add-recipe-temperature-field" formControlName="temperature"/>
              <i class="p-inputgroup-addon">{{'ADD_RECIPE.FIELD.TEMPERATURE.LABEL' | resolve}}</i>
            </div>
          </div>
        </span>

        <span class="p-field ingredients-wrapper" formArrayName="ingredients">
          <div *ngFor="let ingredientsForm of ingredients.controls; let i = index">
            <div class="ingredients-form" formGroupName="{{i}}">
              <div class="ingredients-input-container">
                <input class="p-input ingredient-input" id="add-recipe-name-field" pInputText
                       placeholder="{{'ADD_RECIPE.FIELD.INGREDIENTS.LABEL' | resolve}}" formControlName="name"/>
                <small
                  *ngIf="hasError('ingredients')"
                  class="p-error add-recipe-form-error-message">
                  {{ "ADD_RECIPE.FIELD.ERROR.MESSAGE" | resolve }}
                </small>
              </div>
              <div class="unit-wrapper p-inputgroup">
                <p-inputNumber class="p-input" formControlName="amount" placeholder="{{'ADD_RECIPE.FIELD.AMOUNT.LABEL' | resolve}}"/>
                <div class="p-inputgroup-addon">
                    <p-dropdown class="unit-dropdown" [options]="unitEnumValues" formControlName="unit"></p-dropdown>
                </div>
              </div>
              <input class="p-input ingredient-input" placeholder="{{'ADD_RECIPE.FIELD.INGREDIENTS.DETAILS' | resolve}}" pInputText type="text" formControlName="detail">
              <i class=" pi pi-trash delete-ingredient-icon" (click)="deleteIngredient(i)"></i>
            </div>
          </div>
          <i class="pi pi-plus-circle add-ingredient-icon" (click)="addIngredient()"></i>
        </span>

        <button
          pButton
          type="button"
          class="p-button add-recipe-send-button"
          label="{{'ADD_RECIPE.BUTTON' | resolve}}"
          (click)="onClickAddButton()"
        ></button>
      </form>
    </div>
  `,
})
export class AddRecipeComponent implements OnInit, OnDestroy{
  protected _resourceService: ResourceService;
  protected _formGroup: FormGroup;
  protected _unitEnumValues: Array<UnitEnumValue>;
  protected _recipeCategoryEnumValues: Array<RecipeCategoryEnumValue>;
  protected _recipeActionFactory: RecipeActionFactory;
  protected _formSubscription: Subscription;
  protected _stateSubscription: Subscription;
  protected _formRequest: AddNewRecipeRequest;


  constructor(
    ngrxStore: Store<any>,
    private fb: FormBuilder,
    @Inject(ResourceServiceToken)
      resourceService: ResourceService,
    @Inject(RecipeActionFactoryToken)
      addRecipeActionFactory: RecipeActionFactory,
    @Inject(UnitEnumValuesToken)
      unitEnumValues: Array<UnitEnumValue>,
    @Inject(RecipeCategoryEnumValuesToken)
      recipeCategoryEnumValues: Array<RecipeCategoryEnumValue>,
  ) {
    this._resourceService = resourceService;
    this._unitEnumValues = unitEnumValues;
    this._recipeCategoryEnumValues = recipeCategoryEnumValues;
    this._recipeActionFactory = addRecipeActionFactory;
    this._stateSubscription = ngrxStore.select(selectRecipeListState).subscribe((state: RecipeState) => {
      if (state) {
        this._formRequest = state.newRecipeFormRequest;
      }
    });
  }
  ngOnInit(): void {
    this._formGroup = this.fb.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      category: ['', Validators.required],
      favorite: [false],
      bakeParam: this.fb.group({
        time: this.fb.group({
          hour: [null],
          minute: [null],
        }),
        temperature: [null]
      }),
      ingredients: this.fb.array([]),
    });
    this.addIngredient();
    this._formSubscription = this._formGroup.valueChanges.pipe(debounceTime(FORM_DEBOUNCE_TIME)).subscribe(data => {
      this._recipeActionFactory.changeRecipeForm(this._formGroup.getRawValue());
    });
  }
  get ingredients() {
    return this._formGroup.controls['ingredients'] as FormArray;
  }
  addIngredient() {
    const ingredientForm = this.fb.group({
      name: ['', Validators.required],
      amount: [null],
      unit: [this.unitEnumValues[0].value],
      detail: ['']
    })
    this.ingredients.push(ingredientForm);
  }
  deleteIngredient(ingredientIndex: number) {
    this.ingredients.removeAt(ingredientIndex);
  }
  public onClickAddButton(): void {
    CommonUtils.markFormAsTouched(this._formGroup)
    if (this._formGroup.valid) {
      this._recipeActionFactory.saveNewRecipe(this._formRequest).subscribe();
      this._formGroup.reset()
    }
  }

  hasError(formControlName: string) {
    if (this._formGroup.controls[formControlName].invalid && this._formGroup.controls[formControlName].touched ) {
      this._formGroup.controls[formControlName].markAsDirty()
      return true
    }
    return false
  }

  public get formGroup(): FormGroup {
    return this._formGroup;
  }
  public get unitEnumValues(): Array<any> {
    return this._unitEnumValues;
  }
  public get recipeCategoryEnumValues(): Array<any> {
    return this._recipeCategoryEnumValues;
  }

  ngOnDestroy() {
    CommonUtils.unsubscribeAll(this._stateSubscription);
  }
}
