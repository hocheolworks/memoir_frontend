import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";

import { wrapper } from "../redux/store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className="w-full ml-auto mr-auto pl-4 pr-4 
        first:w-1024px first:pl-0 first:pr-0 
        second:w-1376px second:pl-0 second:pr-0 
        third:w-1728px third:pl-0 third:pr-0"
    >
      <Head>
        <title>MEMOIR.</title>
      </Head>
      <div className="h-full flex flex-col">
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
  );
}

export default wrapper.withRedux(MyApp);
