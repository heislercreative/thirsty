export interface Cocktail {
  idDrink: number;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
}

export interface CocktailResponse {
  drinks: Cocktail[];
}

export interface Ingredient {
  name: string;
  quantity: number;
  measure: string;
  measureString: string;
}

export enum ConversionRate {
  cl = 2.957,
  cup = 0.125,
  gal = 128,
  ml = 29.576,
  oz = 1,
  pint = 16,
  tblsp = 1.999,
  tsp = 5.999,
}

export enum CocktailType {
  alcoholic = 'Alcoholic',
  nonAlcoholic = 'Non_Alcoholic',
}
