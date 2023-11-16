export interface Recipe {
  id: number,
  title: string,
  type: string,
  ingredients: Array<Ingredient>
}

export  interface Ingredient{
  name: string,
  amount: number,
  unit: string
}

