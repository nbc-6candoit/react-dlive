import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import store from './redux/config/configStore';
import { checkAuthState } from './redux/modules/authSlice';
import Router from './shared/Router';
import { ThemeProvider, createTheme } from '@mui/material';

const queryClient = new QueryClient();

const theme = createTheme({
    typography: {
        fontFamily: "'Pretendard', sans-serif",
    },
});

function App() {
    useEffect(() => {
        store.dispatch(checkAuthState());
        console.log('checkAuth in App');
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={true} />
                <Router />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
