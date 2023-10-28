"use client";

import GlobalLayout from "@components/GlobalLayout";
import LoadingFullScreen from "@components/LoadingFullScreen";
import { PopupModal } from "@components/PopupModal/PopupModal";
import { selectLoadingVisible } from "@redux/modules/configSlice";
import { ThemeProvider, useTheme } from "next-themes";
import React, { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props extends PropsWithChildren {}

const NextThemeProvider = ({ children }: Props) => {
  const { theme } = useTheme();
  const loadingVisible = useSelector(selectLoadingVisible);

  return (
    <ThemeProvider attribute="class">
      <div id="wrapper" className="flex h-full w-full flex-col">
        <GlobalLayout>{children}</GlobalLayout>
        {loadingVisible && <LoadingFullScreen />}
        <ToastContainer
          className="mt-[64px]"
          autoClose={1500}
          theme={theme === "dark" ? "dark" : "light"}
        />
        <PopupModal />
      </div>
    </ThemeProvider>
  );
};

export default NextThemeProvider;
