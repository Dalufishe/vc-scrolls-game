import Document, { Html, Head, NextScript, Main } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body className="bg-gray-900 text-gray-100">
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
