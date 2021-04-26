import Link from 'next/link';

import { useTypedSelector as useSelector } from '../../store';

export function Footer(): JSX.Element {
  const theme = useSelector(state => state.theme.footerTheme);  // useContext?

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer__links">
        <Link href="/page/site/sitemap">
          <a className="footer__link">Sitemap</a>
        </Link>

        <Link href="/page/site/disclaimer">
          <a className="footer__link">Disclaimer</a>
        </Link>

        <Link href="/page/site/terms">
          <a className="footer__link">Terms of Use</a>
        </Link>

        <Link href="/page/site/privacy">
          <a className="footer__link">Privacy Policy</a>
        </Link>
        
        <Link href="/page/site/help">
          <a className="footer__link">Help</a>
        </Link>
      </div>

      <p className="footer__copyright">
        &copy; 
        {` 
          2015 - ${(new Date().getFullYear())},
          NoBullshitCooking. All rights reserved.
        `}
      </p>
    </footer>
  );
}