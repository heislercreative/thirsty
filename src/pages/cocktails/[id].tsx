import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const CocktailSingle: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <h2>Cocktail ID#: {id}</h2>;
};

export default CocktailSingle;
