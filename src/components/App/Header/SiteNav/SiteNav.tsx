import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  menuShadowHide,
  menuShadowShow
} from '../../../../store/menu/actions';
// TO DO: this menu data needs to also come dynamically from content types
import fitnessMenuData from './data/fitnessMenuData';
import foodMenuData from './data/foodMenuData';
import supplyMenuData from './data/supplyMenuData';
import Menu from './Menu/Menu';
import './siteNav.css';

export default function SiteNav(): JSX.Element {
  const dispatch = useDispatch();

  const [ expanded, setExpanded ] = useState(false);
  const [ expandedDropdown, setExpandedDropdown ] = useState("none");

  const handleMouseEnter = (dropdown: string) => {
    if (dropdown === expandedDropdown) return;
    setExpanded(true);
    setExpandedDropdown(dropdown)
    dispatch(menuShadowShow());
  };

  const handleMouseLeave = () => {
    setExpanded(false);
    setExpandedDropdown("none");
    dispatch(menuShadowHide());
  };

  return (
    <div className="site-nav">

      <span
        className="site-nav__anchor"
        data-test="food-area"
        onMouseEnter={() => handleMouseEnter('Food')}
        onMouseLeave={handleMouseLeave}
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
        onMouseEnter={() => handleMouseEnter('Fitness')}
        onMouseLeave={handleMouseLeave}
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
        onMouseEnter={() => handleMouseEnter('Supply')}
        onMouseLeave={handleMouseLeave}
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