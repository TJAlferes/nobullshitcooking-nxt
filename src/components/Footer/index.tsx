import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link href="/sitemap">Sitemap</Link>
        <Link href="/disclaimer">Disclaimer</Link>
        <Link href="/terms">Terms of Use</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/help">Help</Link>
      </div>

      <div className="copyright">
        &copy;{` ${(new Date().getFullYear())}, NoBullshitCooking`}
      </div>
    </footer>
  );
}
