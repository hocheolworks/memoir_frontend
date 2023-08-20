import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type GlobalLayoutProps = {
  children: ReactNode;
  withoutFooter?: boolean;
};

const GlobalLayout = ({ children, withoutFooter }: GlobalLayoutProps) => {
  return (
    <>
      <Header />
      <main className="default-width mt-16 flex flex-1 flex-col">
        {children}
      </main>
      {/* {!withoutFooter && <Footer />} */}
    </>
  );
};

export default GlobalLayout;
