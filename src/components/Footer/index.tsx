import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link href="/page/site/sitemap">Sitemap</Link>
        <Link href="/page/site/disclaimer">Disclaimer</Link>
        <Link href="/page/site/terms">Terms of Use</Link>
        <Link href="/page/site/privacy">Privacy Policy</Link>
        <Link href="/page/site/help">Help</Link>
      </div>
      <p>&copy;{` 2015 - ${(new Date().getFullYear())}, NoBullshitCooking. All rights reserved.`}</p>
    </footer>
  );
}
