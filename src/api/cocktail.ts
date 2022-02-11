import { Cocktail, CocktailResponse, CocktailType } from '../models';

const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const searchCocktails = async (searchTerm: string): Promise<Cocktail[]> => {
  const response = await fetch(`${baseUrl}search.php?s=${searchTerm}`);
  const data: CocktailResponse = await response.json();
  return data?.drinks || [];
};

export const searchCocktailsByFirstLetter = async (letter: string): Promise<Cocktail[]> => {
  const response = await fetch(`${baseUrl}search.php?f=${letter}`);
  const data: CocktailResponse = await response.json();
  return data?.drinks || [];
};

export const getCocktail = async (id: string): Promise<Cocktail | null> => {
  const response = await fetch(`${baseUrl}lookup.php?i=${id}`);
  const data: CocktailResponse = await response.json();
  return data?.drinks?.length ? data.drinks[0] : null;
};

export const getCocktailsBytype = async (type: CocktailType): Promise<Cocktail[]> => {
  const response = await fetch(`${baseUrl}filter.php?a=${type}`);
  const data: CocktailResponse = await response.json();
  return data?.drinks || [];
};
