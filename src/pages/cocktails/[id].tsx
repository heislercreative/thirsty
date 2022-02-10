import { CircularProgress } from '@mui/material';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getCocktail, searchCocktails } from '../../api/cocktail';
import { Cocktail, Ingredient } from '../../models';
import { parseIngredients } from '../../utils';
import { IngredientsChart } from '../../components/cocktail';

const CocktailSingle = ({ cocktail }: { cocktail: Cocktail }) => {
  const { strDrink, strDrinkThumb, strInstructions } = cocktail || {};
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (cocktail) {
      setIngredients(parseIngredients(cocktail));
    }
  }, [cocktail]);

  return (
    <div className="container">
      <Head>
        <title>Thirsty - {strDrink}</title>
      </Head>
      <div className="cocktail-single">
        {cocktail ? (
          <>
            <div className="text-center">
              <div className="hero-image">
                <Image className="round-image" src={strDrinkThumb} alt={strDrink} width={200} height={200} />
              </div>

              <h1>{strDrink}</h1>
            </div>

            <h2>Ingredients:</h2>

            <IngredientsChart ingredients={ingredients} />

            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={`ingredient-list-${index}`}>
                  {ingredient.name} {ingredient.measureString && `(${ingredient.measureString})`}
                </li>
              ))}
            </ul>

            <p>{strInstructions}</p>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
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
