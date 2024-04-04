export interface Recipe {
  id: number,
  title: string,
  category: string,
  bakeParam: BakeParam,
  ingredients: Array<Ingredient>
  favorite: boolean
}

export  interface Ingredient{
  name: string,
  amount: number,
  unit: string
}
export interface BakeParam{
  temperature?: number,
  time: TimeParam
}

export interface TimeParam{
  hour?: number,
  minute?: number
}

