import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import Theme from "@/components/Theme";
import AuthGuard from "@/components/AuthGuard";
import Layout from "@/components/Layout";

import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <AuthGuard>
          <Layout>
            <Component {...pageProps} />;
          </Layout>
        </AuthGuard>
      </QueryClientProvider>
    </Theme>
  );
}

export default MyApp;
