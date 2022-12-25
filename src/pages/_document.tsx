import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="h-full">
        <Head>
          <title>Whois</title>
          <meta
            name="description"
            content="Yet another domain/IP lookup tool"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
