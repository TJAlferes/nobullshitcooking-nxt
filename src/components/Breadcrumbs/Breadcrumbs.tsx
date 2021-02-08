import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import { useTypedSelector as useSelector } from '../../store';
import './breadcrumbs.css';

// useRouter hook to get page and use that to dinamically set breadcrumb
// or: https://github.com/NiklasMencke/nextjs-breadcrumbs

export function Breadcrumbs({ id, name, page }: Props): JSX.Element {
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

// /page/guide/food/cuisine/
// /equipment/
// /ingredient/
// /product/
// /recipe/

type Props = {
  id: number;
  name: string;
  page?: string | null;
};