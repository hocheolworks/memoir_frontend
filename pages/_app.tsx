import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "../styles/globals.css";
import "../styles/editor.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";

import { wrapper } from "../redux/store/store";
import { ThemeProvider } from "next-themes";

import { PersistGate } from "redux-persist/integration/react";
import Layout from "../components/MainLayout";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

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
    <ThemeProvider attribute="class">
      <div className="w-full pl-4 pr-4 ml-auto mr-auto first:w-firstScreenWidth first:px-0 second:w-secondScreenWidth second:px-0 third:w-thirdScreenWidth third:px-0">
        <Head>
          <title>MEMOIR.</title>
        </Head>
        <div className="flex flex-col h-full">
          {/* <header>
            <Header />
          </header> */}
          {/* <Layout>
            <Component {...pageProps} />
          </Layout> */}
          {getLayout(<Component {...pageProps} />)}
          {/* <footer>
            <Footer />
          </footer> */}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
