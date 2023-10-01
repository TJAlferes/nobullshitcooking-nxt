import Link            from 'next/link';
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
  //const breadcrumbs = pathname
  //  .split('/')
  //  .filter(Boolean)
  //  .map((segment, index, segments) => {
  //    const path = `/${segments.slice(0, index + 1).join('/')}`;
  //    return {path, label: segment};
  //  });

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
  //return (
  //  <nav>
  //    <ul>
  //      {breadcrumbs.map((breadcrumb, index) => (
  //        <li key={index}>
  //          <Link href={breadcrumb.path}>
  //            {convert(breadcrumb.label)}
  //          </Link>
  //        </li>
  //      ))}
  //    </ul>
  //  </nav>
  //);
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
};

type Breadcrumb = {
  name: string;
  href: string;
};
