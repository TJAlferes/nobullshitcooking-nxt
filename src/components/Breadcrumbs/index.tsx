'use client';

import Link                    from 'next/link';
import { usePathname }         from 'next/navigation';
import { useEffect, useState } from 'react';

// Adapted from https://github.com/NiklasMencke/nextjs-breadcrumbs

export function Breadcrumbs() {
  const pathname = usePathname();
  const [ breadcrumbs, setBreadcrumbs ] = useState<Breadcrumb[]>();

  // is this effect needed?
  useEffect(() => {
    if (pathname === "/profile/:username") {
      setBreadcrumbs([]);
      return;
    }

    if (pathname === "/new-equipment") {
      setBreadcrumbs([{name: "Dashboard", href: "/dashboard"}, {name: "New Equipment", href: "#"}]);
      return;
    }

    if (pathname === "/new-ingredient") {
      setBreadcrumbs([{name: "Dashboard", href: "/dashboard"}, {name: "New Ingredient", href: "#"}]);
      return;
    }

    if (pathname === "/new-plan") {
      setBreadcrumbs([{name: "Dashboard", href: "/dashboard"}, {name: "New Plan", href: "#"}]);
      return;
    }

    if (pathname === "/new-recipe") {
      setBreadcrumbs([{name: "Dashboard", href: "/dashboard"}, {name: "New Recipe", href: "#"}]);
      return;
    }

    const linkPath = pathname?.split('/');

    linkPath?.shift();

    const pathArray = linkPath?.map((path, i) => ({name: convert(path), href: '/' + linkPath.slice(0, i + 1).join('/')}));

    setBreadcrumbs(pathArray);
  }, [pathname]);

  if ( !breadcrumbs || pathname === "/home" || pathname?.match(/^\/$/) ) return null;

  return (
    <nav className="crumbs">
      <span>
        <Link href="/">Home</Link>
        <i className="pointer">&gt;</i>
      </span>

      {breadcrumbs.map(({ name, href }, index) => (
        <span key={href}>
          <Link href={href}>{name}</Link>
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
};

type Breadcrumb = {
  name: string;
  href: string;
};



/*
(same for equipment)

const page = editing ? 'Edit Private Ingredient' : 'Create New Private Ingredient';

const path = '/dashboard';

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



const page = editing
    ? ownership === "private"
      ? 'Edit Private Recipe' : 'Edit Public Recipe'
    : ownership === "private"
      ? 'Submit New Private Recipe' : 'Submit New Public Recipe';
const path = '/dashboard';
*/
