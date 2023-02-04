import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Adapted from https://github.com/NiklasMencke/nextjs-breadcrumbs

export function Breadcrumbs() {
  const pathname = usePathname();
  const [ breadcrumbs, setBreadcrumbs ] = useState<Breadcrumb[]>();

  // TO DO: make this logic more clear
  // TO DO: is this effect even needed?
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
  }, []);

  if (!breadcrumbs) return null;

  if ( pathname === "/home" || pathname?.match(/^\/$/) ) return null;

  console.log(pathname);
  console.log(breadcrumbs);

  return (
    <nav aria-label="breadcrumbs" className="crumbs">
      <span>
        <Link href="/">Home</Link>
        <i className="crumb-pointer">&gt;</i>
      </span>

      {breadcrumbs.map(({ name, href }, index) => (
        <span key={href}>
          <Link href={href}>{name}</Link>
          {index < breadcrumbs.length - 1 && <i className="crumb-pointer">&gt;</i>}
        </span>
      ))}
    </nav>
  );
};

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
*/