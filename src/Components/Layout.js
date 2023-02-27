import react from "react";
import Head from "next/head";

function Layout({ title = "Home" }) {
  return (
    <>
      <Head>
        <title>{`OptiMap Quiz | ${title}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}

export default Layout;