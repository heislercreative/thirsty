import '../styles/index.scss';
import { Container } from '@mui/material';
import type { AppProps } from 'next/app';
import { AppHeader } from '../components/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppHeader />
      <Container maxWidth="sm">
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
