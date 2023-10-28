import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@styles/globals.css";
import "@styles/editor.css";

import { Metadata } from "next";
import ReduxProvider from "@components/CustomProviders/ReduxProvider";
import NextThemeProvider from "@components/CustomProviders/NextThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_WEB_URL ?? "https://www.mem0ir.com"
  ),
  title: "MEMOIR.",
  description: "블로그와 잔디심기를 한번에? 당신의 개발을 회고해보세요!",
  icons: "/favicon-light.ico",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/og/og-memoir.png" }],
    url: "/",
    siteName: "MEMOIR.",
    description: "블로그와 잔디심기를 한번에? 당신의 개발을 회고해보세요!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <ReduxProvider>
          <NextThemeProvider>{children}</NextThemeProvider>{" "}
        </ReduxProvider>
      </body>
    </html>
  );
}
