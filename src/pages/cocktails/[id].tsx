import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCocktail, searchCocktailsByFirstLetter } from '../../api/cocktail';
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
        <title>Thirsty {strDrink ? ` - ${strDrink}` : ''}</title>
      </Head>

      <main className="main cocktail-single">
        {cocktail ? (
          <>
            <div className="text-center">
              <div className="hero-image">
                <Image
                  className="round-image"
                  src={`${strDrinkThumb}/preview`}
                  alt={strDrink}
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                  width={200}
                  height={200}
                />
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
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let cocktail: Cocktail | null;

  try {
    cocktail = await getCocktail(`${params?.id}`);
  } catch (err) {
    return { props: { notFound: true } };
  }

  return {
    props: { cocktail },
  };
};

export const getStaticPaths = async () => {
  const cocktails: Cocktail[] = [];

  for (let i = 0; i < 26; i++) {
    const letter = (i + 10).toString(36);
    try {
      const cocktailResults = await searchCocktailsByFirstLetter(letter);
      cocktails.push(...cocktailResults);
    } catch (err) {
      console.warn(err);
    }
  }

  const paths = cocktails.map(cocktail => ({ params: { id: cocktail.idDrink } }));

  return {
    paths,
    fallback: true,
  };
};

export default CocktailSingle;
