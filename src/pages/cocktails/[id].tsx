import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCocktail, searchCocktails } from '../../api/cocktail';
import { IngredientsChart } from '../../components/cocktail';
import { Loader } from '../../components/layout';
import { Cocktail, Ingredient } from '../../models';
import { parseIngredients } from '../../utils';

const CocktailSingle = ({ cocktail, notFound }: { cocktail: Cocktail; notFound: boolean }) => {
  const { strDrink, strDrinkThumb, strInstructions } = cocktail || {};
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (notFound) {
      router.push('/');
    }
  }, [notFound, router]);

  useEffect(() => {
    if (cocktail) {
      setIngredients(parseIngredients(cocktail));
    }
  }, [cocktail]);

  return (
    <>
      <Head>
        <title>Thirsty - {strDrink}</title>
      </Head>

      <main className="main cocktail-single">
        {/* <div className="cocktail-single"> */}
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

            <p className="instructions">{strInstructions}</p>
          </>
        ) : (
          <Loader />
        )}
        {/* </div> */}
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cocktail = await getCocktail(`${params?.id}`);
  const notFound = !cocktail;

  return {
    props: { cocktail, notFound },
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
