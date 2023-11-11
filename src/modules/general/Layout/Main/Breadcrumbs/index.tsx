import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === undefined) return null;

  const linkPath = pathname?.split('/');
  linkPath?.shift();
  const breadcrumbs = linkPath.map((path, i) => ({
    name: convert(path),
    href: '/' + linkPath.slice(0, i + 1).join('/')
  }));

  if ( !breadcrumbs || pathname === "/home" || pathname?.match(/^\/$/) ) return null;

  return (
    <nav className="crumbs">
      <span>
        <Link href="/">Home</Link>
        <i className="pointer">&gt;</i>
      </span>

      {breadcrumbs.map(({ name, href }, index) => (
        <span key={href}>
          <Link href={href}>{convert(name)}</Link>
          {index < breadcrumbs.length - 1 && <i className="pointer">&gt;</i>}
        </span>
      ))}
    </nav>
  );
}

function convert(string: string) {
  const converted = string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü');

  const capitalized = converted
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1) + ' ')
    .join();

  return capitalized;
}
