import Link from 'next/link';
import { useState } from 'react';

// TO DO: this menu data needs to also come dynamically from content types
import fitnessMenuData from './data/fitnessMenuData';
import foodMenuData from './data/foodMenuData';
import supplyMenuData from './data/supplyMenuData';
import Menu from './Menu/Menu';

export default function SiteNav(): JSX.Element {
  const [ expanded, setExpanded ] = useState(false);
  const [ expandedDropdown, setExpandedDropdown ] = useState("none");

  const mouseEnter = (dropdown: string) => {
    if (dropdown === expandedDropdown) return;
    setExpanded(true);
    setExpandedDropdown(dropdown);
  };

  const mouseLeave = () => {
    setExpanded(false);
    setExpandedDropdown("none");
  };

  return (
    <div className="site-nav">

      <span
        className="site-nav__anchor"
        data-test="food-area"
        onMouseEnter={() => mouseEnter('Food')}
        onMouseLeave={mouseLeave}
      >
        <Link href="/page/guide/food">
          <a className="site-nav__link">Food</a>
        </Link>
        {
          (expanded && expandedDropdown === 'Food')
          ? <Menu menuItems={foodMenuData} /> : false
        }
      </span>

      <span
        className="site-nav__anchor"
        data-test="fitness-area"
        onMouseEnter={() => mouseEnter('Fitness')}
        onMouseLeave={mouseLeave}
      >
        <Link href="/page/guide/fitness">
          <a className="site-nav__link">Fitness</a>
        </Link>
        {
          (expanded && expandedDropdown === 'Fitness')
          ? <Menu menuItems={fitnessMenuData} /> : false
        }
      </span>

      <span
        className="site-nav__anchor"
        data-test="supply-area"
        onMouseEnter={() => mouseEnter('Supply')}
        onMouseLeave={mouseLeave}
      >
        <Link href="/store/storefront">
          <a className="site-nav__link">Supply</a>
        </Link>
        {
          (expanded && expandedDropdown === 'Supply')
          ? <Menu menuItems={supplyMenuData} /> : false
        }
      </span>
      
    </div>
  );
}