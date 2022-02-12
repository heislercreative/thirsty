import { List, ListItem } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/layout';
import { Cocktail } from '../../models';

export const ResultsList = ({ results = [] }: { results: Cocktail[] }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const routeToResult = (id: number) => {
    setLoading(true);
    router.push(`/cocktails/${id}`);
  };

  useEffect(() => () => setLoading(false), []);

  return (
    <>
      {loading && <Loader />}

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
    </>
  );
};
