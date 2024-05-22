import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
// impirt {ThirdWebProvider} from 'thirdweb/react'
import { Navbar } from "../components/Navbar/Navbar";
import NextNProgress from "nextjs-progressbar";
import { NETWORK } from "../const/contractAddresses";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../components/store/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <QueryClientProvider client={queryClient}>
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      activeChain={NETWORK}
    >
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {/* Progress bar when navigating between pages */}
          <NextNProgress
            color="var(--color-tertiary)"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />

          {/* Render the navigation menu above each component */}
          <Navbar />
          {/* Render the actual component (page) */}
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </ThirdwebProvider>
    // </QueryClientProvider>
  );
}

export default MyApp;
