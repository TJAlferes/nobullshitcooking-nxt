import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children, home }: Props) {
  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/nobsc-normal-favicon.png" />
        <meta name="description" content="COOK EAT WIN REPEAT" />
        <meta property="og:image" content={} />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="header">
        {
          home
          ? (
            <>
              <img alt={name} className="" src="" />
              <h1 className="h1">{name}</h1>
            </>
          )
          : (
            <>
              <Link href="/">
                <a>
                  <img alt={name} className="" src="" />
                </a>
              </Link>
              <h2 className="">
                <Link href="/">
                  <a className="">{name}</a>
                </Link>
              </h2>
            </>
          )
        }
      </header>
      <main>{children}</main>
      
    </div>
  );
}

type Props = {
  children: React.ReactNode;
  home?: boolean;
};