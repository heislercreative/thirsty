import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { searchCocktails } from '../api/cocktail';
import { SearchBar } from '../components/layout';
import { ResultsList } from '../components/cocktail';
import { Cocktail } from '../models';

const Home: NextPage = () => {
  const [results, setResults] = useState<Cocktail[]>([]);

  return (
    <>
      <Head>
        <title>Thirsty</title>
        <meta name="description" content="Search your favorite cocktail recipes" />
      </Head>

      <main className="main cocktail-index">
        <SearchBar search={searchCocktails} setResults={setResults} placeholder="Find a drink" />

        <ResultsList results={results} />
      </main>
    </>
  );
};

export default Home;
