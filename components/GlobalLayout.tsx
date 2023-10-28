"use client";

import React, { ReactNode } from "react";
import Header from "./Header";

type GlobalLayoutProps = {
  children: ReactNode;
};

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <>
      <Header />
      <main className="default-width mt-16 flex flex-1 flex-col">
        {children}
      </main>
    </>
  );
};

export default GlobalLayout;
