import './App.css';
import GlobalThemeProvider from './theme/GlobalThemeProvider';
import AppRoutes from './components/routes/Routes';
import { AuthContextProvider } from './auth/AuthContextProvider';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <GlobalThemeProvider>
      <AuthContextProvider>
        <SnackbarProvider  
          maxSnack={3} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          autoHideDuration={3000}
        >
             <AppRoutes/>
         </SnackbarProvider>
      </AuthContextProvider>
    </GlobalThemeProvider>
  );
}

export default App;
