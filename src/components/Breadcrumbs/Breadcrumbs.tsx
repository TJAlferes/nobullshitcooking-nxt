import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useTypedSelector as useSelector } from '../../store';

// CREDIT: Adapted from: https://github.com/NiklasMencke/nextjs-breadcrumbs

export function Breadcrumbs() {
  const router = useRouter();

  const theme = useSelector(state => state.theme.breadCrumbsTheme);

  const [ breadcrumbs, setBreadcrumbs ] = useState<Breadcrumb[]>();

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');

      linkPath.shift();

      const pathArray = linkPath.map((path, i) => ({
        breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/')
      }));

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) return null;

  return (
    <nav aria-label="breadcrumbs">
      <ol className="breadcrumb">
        <li><a href="/">Home</a></li>

        {breadcrumbs.map(({ breadcrumb, href }) => (
          <li key={href}>
            <Link href={href}>
              <a>{convertBreadcrumb(breadcrumb)}</a>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

function convertBreadcrumb(string: string) {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toUpperCase();
};

type Breadcrumb = {
  breadcrumb: string;
  href: string;
};

/*export function Breadcrumbs({ id, name, page }: Props): JSX.Element {
  const theme = useSelector(state => state.theme.breadCrumbsTheme);

  const Breadcrumbs = withBreadcrumbs()(({ breadcrumbs }: any): JSX.Element => {
      if (page) breadcrumbs.pop();
      return (
        <>
          {breadcrumbs.map(({ breadcrumb, match }: any, index: number) => (
            <span className="crumb" key={match.url}>
              <Link href={match.url}>
                <a className="crumb-link">{breadcrumb}</a>
              </Link>

              {(index < breadcrumbs.length) &&
                <i className="crumb-pointer">{`&gt;`}</i>}
            </span>
          ))}

          {page && (
            <Link href={`${page}${id}`}>
              <a className="crumb-link">{name}</a>
            </Link>
          )}
        </>
      );
    }
  );

  return <div className={`crumbs ${theme}`}><Breadcrumbs /></div>;
}

type Props = {
  id: number;
  name: string;
  page?: string | null;
};*/