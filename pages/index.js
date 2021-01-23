import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Home | No Bullshit Cooking</title>
        <link rel="icon" href="/nobsc-normal-favicon.png" />
      </Head>
      <main className="main">
        <h1 className="title">No Bullshit Cooking</h1>
        <p>No Bullshit Cooking</p>
        <Link href="posts/first-post"><a>First Post</a></Link>
      </main>
      <footer className="footer">Footer</footer>
    </div>
  );
}