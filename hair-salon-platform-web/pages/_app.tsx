import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { RecoilRoot } from "recoil";
import sr from "dayjs/locale/sr";

import Theme from "@/components/Theme";
import AuthGuard from "@/components/AuthGuard";
import Layout from "@/components/Layout";

import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <RecoilRoot>
        <LocalizationProvider dateAdapter={DateAdapter} locale={sr}>
          <QueryClientProvider client={queryClient}>
            <AuthGuard>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthGuard>
          </QueryClientProvider>
        </LocalizationProvider>
      </RecoilRoot>
    </Theme>
  );
}

export default MyApp;
