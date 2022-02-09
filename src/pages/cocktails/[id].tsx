import { CircularProgress } from '@mui/material';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { getCocktail, searchCocktails } from '../../api/cocktail';
import { Cocktail, IngredientObject } from '../../models';
import { useCallback, useEffect, useState } from 'react';

const CocktailSingle = ({ cocktail }: { cocktail: Cocktail }) => {
  const { strDrink, strDrinkThumb, strInstructions } = cocktail || {};
  const [ingredientsList, setIngredientsList] = useState<IngredientObject[]>([]);

  const buildIngredientsList = useCallback((): void => {
    const ingredients = [];
    const entries = Object.entries(cocktail).filter(
      ([key, value]) => (key.includes('strIngredient') || key.includes('strMeasure')) && !!value,
    );

    for (let i = 1; i <= 15; i++) {
      const ingredient = entries.find(([key]) => key === `strIngredient${i}`)?.[1]?.trim();
      const measure = entries.find(([key]) => key === `strMeasure${i}`)?.[1]?.trim();
      if (ingredient) {
        ingredients.push({ ingredient, measure });
      }
    }
    setIngredientsList(ingredients);
  }, [cocktail]);

  useEffect(() => {
    if (cocktail) {
      const ingredients = [];

      const entries = Object.entries(cocktail).filter(
        ([key, value]) => (key.includes('strIngredient') || key.includes('strMeasure')) && !!value,
      );

      for (let i = 1; i <= 15; i++) {
        const ingredient = entries.find(([key]) => key === `strIngredient${i}`)?.[1]?.trim();
        const measure = entries.find(([key]) => key === `strMeasure${i}`)?.[1]?.trim();
        if (ingredient) {
          ingredients.push({ ingredient, measure });
        }
      }
      buildIngredientsList();
    }
  }, [cocktail, buildIngredientsList]);

  return (
    <>
      {cocktail ? (
        <>
          <Head>
            <title>Thirsty - {strDrink}</title>
          </Head>

          <Image className="round-image" src={strDrinkThumb} alt={strDrink} width={200} height={200} />

          <h1>{strDrink}</h1>

          <h2>Ingredients:</h2>
          <ul>
            {ingredientsList.map((item, index) => (
              <li key={`ingredient-list-${index}`}>
                {item.ingredient} {item.measure && `(${item.measure})`}
              </li>
            ))}
          </ul>

          <p>{strInstructions}</p>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cocktail = await getCocktail(`${params?.id}`);

  return {
    props: { cocktail },
  };
};

// TODO: Is this that helpful?
export const getStaticPaths = async () => {
  const cocktails = await searchCocktails('a');
  const paths = cocktails.map(cocktail => ({ params: { id: cocktail.idDrink } }));
  console.log('getStaticPaths', paths);

  return {
    paths,
    fallback: true,
  };
};

export default CocktailSingle;
