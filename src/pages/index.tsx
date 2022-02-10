import { CircularProgress, InputAdornment, List, ListItem, TextField } from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { searchCocktails } from '../api/cocktail';
import { Cocktail } from '../models';

const Home: NextPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Cocktail[]>([]);

  const clearSearch = () => setSearchTerm('');

  const fetchResults = useCallback(async () => {
    const drinks = await searchCocktails(searchTerm);
    setResults(drinks);
    setLoading(false);
  }, [searchTerm]);

  const routeToResult = id => {
    router.push(`/cocktails/${id}`);
  };

  const EndAdornment = () =>
    searchTerm.length > 0 ? (
      <InputAdornment position="end" onClick={clearSearch}>
        {loading ? <CircularProgress /> : <Close />}
      </InputAdornment>
    ) : (
      <></>
    );

  useEffect(() => {
    let searchTimeout: NodeJS.Timeout;

    if (searchTerm.length > 0) {
      setLoading(true);
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

      <main className="main">
        <h1 className="text-center">Thirsty</h1>

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

        <List>
          {results.map(({ idDrink, strDrink, strDrinkThumb }) => (
            <ListItem key={'result-' + idDrink} onClick={() => routeToResult(idDrink)}>
              <Image className="round-image" src={strDrinkThumb} alt={strDrink} width={200} height={200} />
              {strDrink}
            </ListItem>
          ))}
        </List>
      </main>
    </>
  );
};

export default Home;
