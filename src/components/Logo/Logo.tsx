//import Image from 'next/image';
import Link from 'next/link';

export function Logo({ theme }: Props): JSX.Element {
  return (
    <div className={`logo ${theme}`}>
      <Link href="/">
        <a className="logo__home-link">
          <img
            className="home-link"
            src={(theme === "header-light" || theme === "left-nav-light")
              ? "/images/header/logo-mobile-red-small.png"
              : "/images/header/logo-mobile-dark-red-small.png"
            }
            width="68"
            height="20"
          />
        </a>
      </Link>
    </div>
  );
}

type Props = {
  theme: string;
};