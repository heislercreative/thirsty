import { ChartData, Cocktail, ConversionRate, Ingredient } from '../models';

export const conversions: { [key: string]: number } = {
  cl: ConversionRate.cl,
  cup: ConversionRate.cup,
  gal: ConversionRate.gal,
  ml: ConversionRate.ml,
  oz: ConversionRate.oz,
  pint: ConversionRate.pint,
  tblsp: ConversionRate.tblsp,
  tsp: ConversionRate.tsp,
};

export const parseIngredients = (cocktail: Cocktail): Ingredient[] => {
  const ingredients = [];
  const entries = Object.entries(cocktail).filter(
    ([key, value]) => (key.includes('strIngredient') || key.includes('strMeasure')) && !!value,
  );

  for (let i = 1; i <= 15; i++) {
    let quantity;
    let measure;
    const name = entries.find(([key]) => key === `strIngredient${i}`)?.[1]?.trim();

    if (name) {
      const measureString = entries
        .find(([key]) => key === `strMeasure${i}`)?.[1]
        ?.trim()
        .toLowerCase();

      if (measureString) {
        for (const key of Object.keys(conversions)) {
          const measureMatch = measureString.match(new RegExp(key));
          if (measureMatch) {
            measure = measureMatch[0];
            break;
          }
        }

        const quantityMatch = measureString.match(/([0-9\/\s]*)(?=\s)/);

        if (quantityMatch) {
          quantity = eval(quantityMatch[0].split(' ').join('+'));
        }
      }

      ingredients.push({ name, quantity, measure, measureString });
    }
  }

  return ingredients;
};

export const parseIngredientsChartData = (ingredients: Ingredient[]): ChartData[] => {
  const data: ChartData[] = [];

  ingredients.forEach(ingredient => {
    let { quantity, measure, measureString, name } = ingredient;
    name = name + (measureString ? ` (${measureString})` : '');
    const color = generateRandomPastelColor();
    let value = 0;

    if (quantity && measure) {
      const conversionRate = conversions[measure.toLowerCase()];
      if (conversionRate) {
        value = quantity * conversionRate;
      }
    }

    data.push({ name, value, color });
  });

  return data;
};

export const generateRandomPastelColor = (): string => {
  // TODO: Maintain list of already-generated colors & pad new hue by 15-20 to avoid duplicates
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(20 + 70 * Math.random());
  const lightness = Math.floor(75 + 15 * Math.random());
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
