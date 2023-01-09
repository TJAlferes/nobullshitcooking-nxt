import Link from 'next/link';

import { useTypedSelector as useSelector } from '../../store';

export function Footer(): JSX.Element {
  const theme = useSelector(state => state.theme.theme);

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-links">
        <Link href="/page/site/sitemap"><a>Sitemap</a></Link>
        <Link href="/page/site/disclaimer"><a>Disclaimer</a></Link>
        <Link href="/page/site/terms"><a>Terms of Use</a></Link>
        <Link href="/page/site/privacy"><a>Privacy Policy</a></Link>
        <Link href="/page/site/help"><a>Help</a></Link>
      </div>
      <p>&copy;{` 2015 - ${(new Date().getFullYear())}, NoBullshitCooking. All rights reserved.`}</p>
    </footer>
  );
}