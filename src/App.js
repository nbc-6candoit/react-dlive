import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import store from "./redux/config/configStore";
import { checkAuthState } from "./redux/modules/authSlice";
import Router from "./shared/Router";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    store.dispatch(checkAuthState());
    console.log("checkAuth in App");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
