import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useTypedSelector as useSelector } from '../../store';

// CREDIT: Adapted from: https://github.com/NiklasMencke/nextjs-breadcrumbs
export function Breadcrumbs() {
  const router = useRouter();
  const theme = useSelector(state => state.theme.theme);
  const [ breadcrumbs, setBreadcrumbs ] = useState<Breadcrumb[]>();

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();
      const pathArray = linkPath.map((path, i) => ({name: path, href: '/' + linkPath.slice(0, i + 1).join('/')}));
      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) return null;

  if (router.pathname === "/profile/:username") setBreadcrumbs([]);
  if (router.pathname === "/new-equipment")     setBreadcrumbs([{name: "Dashboard", href: "/dashboard"}, {name: "New Equipment", href: "#"}]);
  if (router.pathname === "/new-ingredient")    setBreadcrumbs([{name: "Dashboard", href: "/dashboard"}, {name: "New Ingredient", href: "#"}]);
  if (router.pathname === "/new-plan")          setBreadcrumbs([{name: "Dashboard", href: "/dashboard"}, {name: "New Plan", href: "#"}]);
  if (router.pathname === "/new-recipe")        setBreadcrumbs([{name: "Dashboard", href: "/dashboard"}, {name: "New Recipe", href: "#"}]);

  return (
    <nav aria-label="breadcrumbs">
      <span><Link href="/"><a>Home</a></Link><i>{`&gt;`}</i></span>
      {breadcrumbs.map(({ name, href }) => <span key={href}><Link href={href}><a>{convertBreadcrumb(name)}</a></Link><i>{`&gt;`}</i></span>)}
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
  name: string;
  href: string;
};



/*
(same for equipment)

const page = staffIsAuthenticated
  ? editing ? 'Edit Ingredient' : 'Create New Ingredient'
  : editing ? 'Edit Private Ingredient' : 'Create New Private Ingredient';

const path = staffIsAuthenticated ? '/staff-dashboard' : '/dashboard';

<div>
  <span><Link href="/home"><a>Home</a></Link><i>{`&gt;`}</i></span>

  <span><Link href={path}><a>Dashboard</a></Link><i>{`&gt;`}</i></span>

  <span>{page}</span>
</div>

<h1>{page}</h1>



<div>
  <span><Link href="/home"><a>Home</a></Link><i>{`&gt;`}</i></span>
  <span><Link href="/dashboard"><a>Dashboard</a></Link><i>{`&gt;`}</i></span>
  <span>{editing ? 'Edit Plan' : 'Create New Plan'}</span>
</div>

<h1>{editing ? 'Edit Plan' : 'Create New Plan'}</h1>



const page = staffIsAuthenticated
  ? editing
    ? 'Edit Recipe' : 'Create New Recipe'
  : editing
    ? ownership === "private"
      ? 'Edit Private Recipe' : 'Edit Public Recipe'
    : ownership === "private"
      ? 'Submit New Private Recipe' : 'Submit New Public Recipe';
const path = staffIsAuthenticated ? '/staff-dashboard' : '/dashboard';



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

type Props = {
  id: number;
  name: string;
  page?: string | null;
};
*/