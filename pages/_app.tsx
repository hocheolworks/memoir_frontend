import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "../styles/globals.css";
import "../styles/editor.css";
import "../styles/contribution.css";

import type { AppProps } from "next/app";
import Head from "next/head";

import { wrapper } from "../redux/store/store";
import { ThemeProvider } from "next-themes";
import Layout from "../components/MainLayout";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // getLayout 정의가 있으면 해당 레이아웃 사용, 아니라면 기본 레이아웃 함수
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute="class">
          <div className="ml-auto mr-auto w-full pl-4 pr-4 first:w-firstScreenWidth first:px-0 second:w-secondScreenWidth second:px-0 third:w-thirdScreenWidth third:px-0">
            <Head>
              <title>MEMOIR.</title>
            </Head>
            <div className="flex h-full flex-col">
              {getLayout(<Component {...pageProps} />)}
            </div>
          </div>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
