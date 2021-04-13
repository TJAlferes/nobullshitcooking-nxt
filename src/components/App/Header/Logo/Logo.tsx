import Link from 'next/link';
import React from 'react';

import LogoLargeLight from '../../../../../assets/images/header/logo-slim-red.png';
import LogoLargeDark from '../../../../../assets/images/header/logo-slim-dark-red.png';
import LogoSmallLight from '../../../../../assets/images/header/logo-mobile-red.png';
import LogoSmallDark from '../../../../../assets/images/header/logo-mobile-dark-red.png';
import './logo.css';

export function Logo({ theme }: Props): JSX.Element {
  return (
    <div className={`logo ${theme}`}>
      <Link href="/">
        <a className="logo__home-links">
          <img
            className="home-link--large"
            src={theme === 'header-light' ? LogoLargeLight : LogoLargeDark}
          />
          
          <img
            className="home-link--small"
            src={theme === 'header-light' ? LogoSmallLight : LogoSmallDark}
          />
        </a>
      </Link>
    </div>
  );
}

type Props = {
  theme: string;
};