import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@styles/globals.css";
import "@styles/editor.css";

import ReduxProvider from "@components/CustomProviders/ReduxProvider";
import NextThemeProvider from "@components/CustomProviders/NextThemeProvider";

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
