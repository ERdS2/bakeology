export interface Recipe {
  id: number,
  title: string,
  subTitle: string,
  category: string,
  bakeParam: BakeParam,
  ingredients: Array<Ingredient>,
  favorite: boolean,
  note: string
}

export  interface Ingredient{
  name: string,
  amount: number,
  unit: string
  detail: string
}
export interface BakeParam{
  temperature?: number,
  time: TimeParam
}

export interface TimeParam{
  hour?: number,
  minute?: number
}

