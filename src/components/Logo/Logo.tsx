import Link from 'next/link';

import { useTypedSelector as useSelector } from '../../store';

export function Logo(): JSX.Element {
  const theme = useSelector(state => state.theme.theme);

  return (
    <div className={`logo ${theme}`}>
      <Link href="/">
        <a className="logo__a">
          <img
            className="home-link"
            src={theme === "light"
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