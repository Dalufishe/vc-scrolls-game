import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>
          VC scrolls games | A web base game design for Vesuvius Challenge
        </title>
        <style>
          {`
          *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          `}
        </style>
      </Head>
      <Component {...pageProps}/>
    </>
  );
}

export default MyApp;
