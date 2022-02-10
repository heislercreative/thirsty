import { CircularProgress, InputAdornment, List, ListItem, TextField } from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { searchCocktails } from '../api/cocktail';
import { Loader } from '../components/layout';
import { Cocktail } from '../models';

const Home: NextPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<Cocktail[]>([]);

  const clearSearch = () => setSearchTerm('');

  const fetchResults = useCallback(async () => {
    const drinks = await searchCocktails(searchTerm);
    setResults(drinks);
    setSearching(false);
  }, [searchTerm]);

  const routeToResult = (id: number) => {
    setLoading(true);
    router.push(`/cocktails/${id}`);
  };

  const EndAdornment = () =>
    searchTerm.length > 0 ? (
      <InputAdornment className="search-end" position="end" onClick={clearSearch}>
        {searching ? <CircularProgress size={24} /> : <Close />}
      </InputAdornment>
    ) : (
      <></>
    );

  useEffect(() => {
    let searchTimeout: NodeJS.Timeout;

    if (searchTerm.length > 0) {
      setSearching(true);
      searchTimeout = setTimeout(() => fetchResults(), 200);
    } else {
      setResults([]);
    }

    return () => clearTimeout(searchTimeout);
  }, [searchTerm, fetchResults]);

  return (
    <>
      <Head>
        <title>Thirsty</title>
        <meta name="description" content="Search your favorite cocktail recipes" />
      </Head>

      {loading && <Loader />}

      <main className="main cocktail-index">
        <TextField
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Find a drink"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: <EndAdornment />,
          }}
        ></TextField>

        {!!results.length && (
          <List className="results-list">
            {results.map(({ idDrink, strDrink, strDrinkThumb }) => (
              <ListItem className="results-list-item" key={'result-' + idDrink} onClick={() => routeToResult(idDrink)}>
                <div className="list-item-image">
                  <Image
                    className="round-image"
                    src={strDrinkThumb}
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
