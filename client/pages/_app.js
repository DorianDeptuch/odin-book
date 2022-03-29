import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import Head from "next/head";

export const UserContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
