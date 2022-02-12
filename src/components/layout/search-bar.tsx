import { CircularProgress, InputAdornment, TextField } from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

export const SearchBar = ({
  search,
  setResults,
  placeholder = 'Search',
}: {
  search: (term: string) => Promise<unknown[]>;
  setResults: Dispatch<SetStateAction<any[]>>; // eslint-disable-line @typescript-eslint/no-explicit-any
  placeholder: string;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);

  const clearSearch = () => setSearchTerm('');

  const fetchResults = useCallback(async () => {
    const results = await search(searchTerm);
    setResults(results);
    setSearching(false);
  }, [searchTerm, search, setResults]);

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
  }, [searchTerm, fetchResults, setResults]);

  return (
    <TextField
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: <EndAdornment />,
      }}
    ></TextField>
  );
};
