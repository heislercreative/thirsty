import '../styles/index.scss';
import { Container } from '@mui/material';
import type { AppProps } from 'next/app';
import { Header } from '../components/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
