import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@styles/globals.css";
import "@styles/editor.css";
import "@styles/contribution.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import Head from "next/head";

import { ToastContainer } from "react-toastify";
import { wrapper } from "@redux/store/store";
import { ThemeProvider, useTheme } from "next-themes";
import { Provider } from "react-redux";
import { store, persistor } from "@redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Header from "@components/Header";
import Footer from "@components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const { theme } = useTheme();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute="class">
          <Head>
            <title>MEMOIR.</title>
          </Head>
          <Header />
          <div
            id="contents"
            className="mx-auto w-full flex-1 px-4 first:w-firstScreenWidth first:px-0 second:w-secondScreenWidth second:px-0 third:w-thirdScreenWidth third:px-0"
          >
            <div className="flex h-full flex-col">
              <Component {...pageProps} />
              <ToastContainer
                autoClose={1500}
                theme={theme === "dark" ? "dark" : "light"}
              />
            </div>
          </div>
          <Footer />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
