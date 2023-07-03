import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@styles/globals.css";
import "@styles/editor.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import Head from "next/head";

import { ToastContainer } from "react-toastify";
import { wrapper } from "@redux/store/store";
import { ThemeProvider, useTheme } from "next-themes";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "@redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import GlobalLayout from "@components/GlobalLayout";
import { NextPage } from "next/types";
import { ReactElement, ReactNode } from "react";
import { PopupModal } from "@components/PopupModal";
import { selectLoadingVisible } from "@redux/modules/configSlice";
import LoadingFullScreen from "@components/LoadingFullScreen";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { theme } = useTheme();
  const loadingVisible = useSelector(selectLoadingVisible);

  const getLayout =
    Component.getLayout || ((page) => <GlobalLayout>{page}</GlobalLayout>);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute="class">
          <Head>
            <title>MEMOIR.</title>
          </Head>
          <div id="wrapper" className="flex h-full w-full flex-col">
            {getLayout(<Component {...pageProps} />)}
            {loadingVisible && <LoadingFullScreen />}
            <ToastContainer
              autoClose={1500}
              theme={theme === "dark" ? "dark" : "light"}
            />
            <PopupModal />
          </div>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
