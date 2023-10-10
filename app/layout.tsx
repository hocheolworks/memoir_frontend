import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@styles/globals.css";
import "@styles/editor.css";
import "react-toastify/dist/ReactToastify.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MEMOIR.",
  description: "블로그와 잔디심기를 한번에? 당신의 개발을 회고해보세요!",
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
  return (
    <html lang="ko">
      <body className="bg-white text-black dark:bg-black dark:text-white">
        {children}
      </body>
    </html>
  );
}
