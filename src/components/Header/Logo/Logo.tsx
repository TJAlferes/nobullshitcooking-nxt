//import Image from 'next/image';
import Link from 'next/link';

// /images/header/logo-mobile-red.png
// /images/header/logo-mobile-dark-red.png

export function Logo({ theme }: Props): JSX.Element {
  return (
    <div className={`logo ${theme}`}>
      <Link href="/">
        <a className="logo__home-links">
          <img
            //className="home-link--large"
            src={theme === 'header-light'
              ? "/images/header/logo-slim-red.png"
              : "/images/header/logo-slim-dark-red.png"
            }
            width="448"
            height="62"
          />
          
          {/*<img
            className="home-link--small"
            src={theme === 'header-light' ? LogoSmallLight : LogoSmallDark}
          />*/}
        </a>
      </Link>
    </div>
  );
}

type Props = {
  theme: string;
};