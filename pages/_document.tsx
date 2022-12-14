import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="title" content="MEMOIR." />
          <meta name="description" content="Log your memories to MEMOIR." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body
          className="text-black bg-white dark:bg-black dark:text-white"
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
