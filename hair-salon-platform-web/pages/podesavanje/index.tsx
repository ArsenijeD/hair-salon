import type { NextPage } from "next";
import Head from "next/head";
import styles from "./styles.module.scss";

const Podesavanje: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Podesavanje</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Podesavanje</h1>
      </main>
    </div>
  );
};

export default Podesavanje;
