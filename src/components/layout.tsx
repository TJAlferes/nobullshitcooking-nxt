import Head from 'next/head';
//import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children, home }: Props) {
  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/icons/normal.png" />
        <meta name="description" content="COOK EAT WIN REPEAT" />
      </Head>
      <header className="header">
        <Link href="/">
          <a>
            <img src="/images/logo-slim-red.png" width="448" height="62" />
          </a>
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}

type Props = {
  children: React.ReactNode;
  home?: boolean;
};