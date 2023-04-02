import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import { Layout } from "@/components/Layout/Layout";
import { AuthContextWrapper } from "@/context/AuthContext";
import { RouteGuard } from "@/components/RouteGuard/RouteGuard";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { DrawerProvider } from "@/context/DrawerContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <AuthContextWrapper>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <RouteGuard>
            <DrawerProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            </DrawerProvider>
          </RouteGuard>
        </ThemeProvider>
      </CacheProvider>
    </AuthContextWrapper>
  );
}
