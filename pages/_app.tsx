import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";

import { wrapper } from "../redux/store/store";
import { ThemeProvider } from "next-themes";

import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <div className="w-full pl-4 pr-4 ml-auto mr-auto first:w-firstScreenWidth first:px-0 second:w-secondScreenWidth second:px-0 third:w-thirdScreenWidth third:px-0">
        <Head>
          <title>MEMOIR.</title>
        </Head>
        <div className="flex flex-col h-full">
          <header>
            <Header />
          </header>
          <div className="flex-1">
            <Component {...pageProps} />
          </div>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
