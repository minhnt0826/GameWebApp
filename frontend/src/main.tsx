import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AuthStateContextProvider from "./contexts/Authentication.tsx";
import { theme } from "./theme.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthStateContextProvider>
          <App />
        </AuthStateContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
