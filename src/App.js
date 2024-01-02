import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Router from './shared/Router';
import { ThemeProvider, createTheme } from '@mui/material';

const queryClient = new QueryClient();

const theme = createTheme({
    typography: {
        fontFamily: "'Pretendard', sans-serif",
    },
});

function App() {
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
