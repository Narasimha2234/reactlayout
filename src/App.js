import './App.css';
import NavBar from './components/NavBar';
import SideNav from './components/SideNav';
import GlobalThemeProvider from './theme/GlobalThemeProvider';
import { Box } from '@mui/material';
import Home from './components/pages/public/Home';
import AppRoutes from './components/routes/Routes';

function App() {
  return (
    <GlobalThemeProvider>
      {/* <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <NavBar />
        <SideNav open={false} />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 ,mt:5 }}
        >
          <Home />
        </Box>
      </Box> */} <AppRoutes/>
    </GlobalThemeProvider>
  );
}

export default App;
