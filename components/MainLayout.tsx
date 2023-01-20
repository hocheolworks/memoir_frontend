import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  withFooter?: boolean;
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ withFooter = true, children }) => {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      {withFooter && <Footer />}
    </>
  );
};

export default Layout;
