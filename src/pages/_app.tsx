import '../styles/index.scss';
import { Container } from '@mui/material';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container maxWidth="sm">
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
