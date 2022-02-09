import { Cocktail, CocktailResponse } from '../models';

const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const searchCocktails = async (searchTerm: string): Promise<Cocktail[]> => {
  const response = await fetch(`${baseUrl}search.php?s=${searchTerm}`);
  const data: CocktailResponse = await response.json();
  return data?.drinks || [];
};

export const getCocktail = async (id: string): Promise<Cocktail> => {
  const response = await fetch(`${baseUrl}lookup.php?i=${id}`);
  const data: CocktailResponse = await response.json();
  return data?.drinks[0];
};
