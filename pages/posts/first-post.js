import Head from 'next/head';
import Link from 'next/link';

import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post | No Bullshit Cooking</title>
        <link rel="icon" href="/nobsc-normal-favicon.png" />
      </Head>
      <main className="main">
        <h1 className="title">First Post</h1>
        <p>First Post</p>
        <Link href="/"><a>Home</a></Link>
      </main>
      <footer className="footer">Footer</footer>
    </Layout>
  );
}