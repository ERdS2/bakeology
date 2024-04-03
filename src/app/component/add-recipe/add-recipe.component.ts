import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import ResourceService, {ResourceServiceToken} from "../../core/resource/service/resource.service";
import {UnitEnum} from "./model/unit.enum";
import {RecipeCategoryConfig, UnitConfig} from "../../app.config";
import {RecipeCategoryEnum} from "./model/recipe-category.enum";
import {AddRecipeActionFactory, AddRecipeActionFactoryToken} from "./action/add-recipe.action.factory";
import {CommonUtils} from "../../core/utils/common.utils";

@Component({
  selector: 'b-add-recipe',
  template: `
    <div class="b-add-recipe-container">
      <form [formGroup]="formGroup" id="addRecipeForm" class="add-recipe-form">
        <span class="bake-title-category-wrapper">
          <div class="title-input-container">
            <input class="p-input" id="addRecipeTitleField" pInputText placeholder="{{'ADD_RECIPE.FIELD.TITLE.LABEL' | resolve}}" formControlName="title" />
            <small
              *ngIf="hasError('title')"
              class="p-error add-recipe-form-error-message">
              {{ "ADD_RECIPE.FIELD.ERROR.MESSAGE" | resolve }}
            </small>
          </div>
          <div class="category-input-container">
            <p-dropdown class="recipe-category-dropdown" [options]="recipeCategoryOptions" formControlName="category" placeholder="{{'ADD_RECIPE.FIELD.CATEGORY.LABEL' | resolve}}"></p-dropdown>
            <small
              *ngIf="hasError('category')"
              class="p-error add-recipe-form-error-message">
              {{ "ADD_RECIPE.FIELD.ERROR.MESSAGE" | resolve }}
            </small>
          </div>
        </span>

        <span class="bake-param-wrapper" formGroupName="bakeParam">
          <div formGroupName="time" class="time-container p-input">
            <div class="p-input p-inputgroup hour-inputgroup">
              <p-inputNumber class="hour-input time-input" formControlName="hour" />
              <i class="p-input p-inputgroup-addon">{{'ADD_RECIPE.FIELD.TIME.HOUR.LABEL' | resolve}}</i>
            </div>
            <div class="p-inputgroup minute-inputgroup">
              <p-inputNumber class="p-input minute-input  time-input" formControlName="minute" />
              <i class="p-inputgroup-addon">{{'ADD_RECIPE.FIELD.TIME.MINUTE.LABEL' | resolve}}</i>
            </div>
          </div>
          <div class="p-inputgroup temperature-inputgroup">
            <p-inputNumber class="p-input" id="add-recipe-temperature-field" formControlName="temperature"/>
            <i class="p-inputgroup-addon">{{'ADD_RECIPE.FIELD.TEMPERATURE.LABEL' | resolve}}</i>
          </div>
        </span>

        <span class="p-field ingredients-wrapper" formArrayName="ingredients">
          <div *ngFor="let ingredientsForm of ingredients.controls; let i = index">
            <div class="ingredients-form" formGroupName="{{i}}">
              <div class="ingredients-input-container">
                <input class="p-input" id="add-recipe-name-field" pInputText placeholder="{{'ADD_RECIPE.FIELD.INGREDIENTS.LABEL' | resolve}}" formControlName="name"/>
                <small
                  *ngIf="hasError('ingredients')"
                  class="p-error add-recipe-form-error-message">
                  {{ "ADD_RECIPE.FIELD.ERROR.MESSAGE" | resolve }}
                </small>
              </div>
              <div class="unit-wrapper p-inputgroup">
                <p-inputNumber class="p-input" formControlName="value" placeholder="{{'ADD_RECIPE.FIELD.VALUE.LABEL' | resolve}}"/>
                <div class="p-inputgroup-addon">
                    <p-dropdown class="unit-dropdown" [options]="unitOptions" formControlName="unit"></p-dropdown>
                </div>
              </div>
              <i class=" pi pi-trash delete-ingridient-icon" (click)="deleteIngredient(i)"></i>
            </div>
          </div>
          <i class="pi pi-plus-circle add-ingredient-icon" (click)="addIngredient()"></i>
        </span>

        <button
          pButton
          type="button"
          class="p-button add-recipe-send-button"
          label="{{'ADD_RECIPE.BUTTON' | resolve}}"
          (click)="onClickSearchButton()"
        ></button>
      </form>
    </div>
  `,
})
export class AddRecipeComponent implements OnInit{
  protected _resourceService: ResourceService;
  protected _formGroup: FormGroup;
  protected _unitOptions: Array<UnitEnum>;
  protected _recipeCategoryOptions: Array<RecipeCategoryEnum>;
  protected _addRecipeActionFactory: AddRecipeActionFactory;

  constructor(
    private fb: FormBuilder,
    @Inject(ResourceServiceToken)
      resourceService: ResourceService,
    @Inject(AddRecipeActionFactoryToken)
      addRecipeActionFactory: AddRecipeActionFactory,

  ) {
    this._resourceService = resourceService;
    this._unitOptions = UnitConfig;
    this._recipeCategoryOptions = RecipeCategoryConfig;
    this._addRecipeActionFactory = addRecipeActionFactory;

  }
  ngOnInit(): void {
    this._formGroup = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
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
  }
  get ingredients() {
    return this._formGroup.controls['ingredients'] as FormArray;
  }
  addIngredient() {
    const ingredientForm = this.fb.group({
      name: ['', Validators.required],
      value: [null],
      unit: [this.unitOptions[0]]
    })
    this.ingredients.push(ingredientForm);
  }
  deleteIngredient(ingredientIndex: number) {
    this.ingredients.removeAt(ingredientIndex);
  }
  public onClickSearchButton(): void {
    CommonUtils.markFormAsTouched(this._formGroup)
    if (this._formGroup.valid) {
      this._addRecipeActionFactory.saveNewRecipe(this._formGroup.value).subscribe();
      this._formGroup.reset()
    }
  }

  hasError(formControlName: string) {
    if (this._formGroup.controls[formControlName].invalid && this._formGroup.controls[formControlName].touched || this._formGroup.controls[formControlName].dirty) {
      this._formGroup.controls[formControlName].markAsDirty()
      return true
    }
    return false
  }

  public get formGroup(): FormGroup {
    return this._formGroup;
  }
  public get unitOptions(): Array<UnitEnum> {
    return this._unitOptions;
  }
  public get recipeCategoryOptions(): Array<RecipeCategoryEnum> {
    return this._recipeCategoryOptions;
  }
}
