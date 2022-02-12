import { List, ListItem } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { searchCocktails } from '../api/cocktail';
import { Loader, SearchBar } from '../components/layout';
import { Cocktail } from '../models';

const Home: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Cocktail[]>([]);

  const routeToResult = (id: number) => {
    setLoading(true);
    router.push(`/cocktails/${id}`);
  };

  return (
    <>
      <Head>
        <title>Thirsty</title>
        <meta name="description" content="Search your favorite cocktail recipes" />
      </Head>

      {loading && <Loader />}

      <main className="main cocktail-index">
        <SearchBar search={searchCocktails} setResults={setResults} placeholder="Find a drink" />

        {!!results.length && (
          <List className="results-list">
            {results.map(({ idDrink, strDrink, strDrinkThumb }) => (
              <ListItem className="results-list-item" key={'result-' + idDrink} onClick={() => routeToResult(idDrink)}>
                <div className="list-item-image">
                  <Image
                    className="round-image"
                    src={`${strDrinkThumb}/preview`}
                    alt={strDrink}
                    width={200}
                    height={200}
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                  />
                </div>
                {strDrink}
              </ListItem>
            ))}
          </List>
        )}
      </main>
    </>
  );
};

export default Home;
