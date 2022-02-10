import { AppBar, IconButton, Toolbar } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';

export const AppHeader = () => {
  const router = useRouter();
  const showBack = router.route !== '/';

  return (
    <AppBar className="app-header" position="static">
      <Toolbar>
        {showBack && (
          <IconButton className="header-back" onClick={() => router.back()}>
            <ArrowBack />
          </IconButton>
        )}
        <h1 className="header-title">Thirsty</h1>
      </Toolbar>
    </AppBar>
  );
};
