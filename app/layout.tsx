import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@styles/globals.css";
import "@styles/editor.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { wrapper } from "@redux/store/store";
import { ThemeProvider, useTheme } from "next-themes";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "@redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { PopupModal } from "@components/PopupModal";
import { selectLoadingVisible } from "@redux/modules/configSlice";
import LoadingFullScreen from "@components/LoadingFullScreen";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MEMOIR.",
  description: "블로그와 잔디심기를 한번에? 당신의 개발을 회고해보세요!",
  icons: "/favicon-light.ico",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    images: [{ url: "https://mem0ir.com/og/og-memoir.png" }],
    url: "https://www.mem0ir.com",
    siteName: "MEMOIR.",
    description: "블로그와 잔디심기를 한번에? 당신의 개발을 회고해보세요!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const loadingVisible = useSelector(selectLoadingVisible);

  return (
    <html lang="ko">
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider attribute="class">
              <div id="wrapper" className="flex h-full w-full flex-col">
                {children}
                {loadingVisible && <LoadingFullScreen />}
                <ToastContainer
                  className="mt-[64px]"
                  autoClose={1500}
                  theme={theme === "dark" ? "dark" : "light"}
                />
                <PopupModal />
              </div>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
