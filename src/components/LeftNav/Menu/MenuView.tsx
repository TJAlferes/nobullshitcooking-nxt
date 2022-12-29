import Link from 'next/link';
import React from 'react';

import { Menu, IMenuItem } from './Menu';

const url = 'https://s3.amazonaws.com/nobsc-images-01/header/dropdowns/';
// TO DO: shorten file names
const light: ISubmenuImages = {
  'cuisines': `${url}world-map-cuisines-slide.png`,
  'equipment': `${url}abundance-ingredients-slide.png`,  // finish
  'exercises': `${url}pushups-exercises-slide.png`,
  'ingredients': `${url}abundance-ingredients-slide.png`,
  'kitchen': `${url}kitchen-equipment-slide.png`,
  'methods': `${url}fire-methods-slide.png`,
  'nutrition': `${url}steve-reeves-nutrition-slide.png`,
  'principles': `${url}vitruvian-man-principles-slide.png`,
  'recipes': `${url}abundance-ingredients-slide.png`  // finish
};
const dark: ISubmenuImages = {
  'cuisines': `${url}world-map-cuisines-slide-dark.png`,
  'equipment': `${url}abundance-ingredients-slide-dark.png`,  // finish
  'exercises': `${url}pushups-exercises-slide-dark.png`,
  'ingredients': `${url}abundance-ingredients-slide-dark.png`,
  'kitchen': `${url}kitchen-equipment-slide-dark.png`,
  'methods': `${url}fire-methods-slide-dark.png`,
  'nutrition': `${url}steve-reeves-nutrition-slide-dark.png`,
  'principles': `${url}vitruvian-man-principles-slide-dark.png`,
  'recipes': `${url}abundance-ingredients-slide-dark.png`  // finish
};

export function MenuView({
  activeMenuRow,
  clearActiveMenuRow,
  closeMenus,
  enterRow,
  expanded,
  leaveMenu,
  level,
  menuItems,
  openMenu,
  theme
}: Props): JSX.Element {
  const getSubmenuImage = () => {
    if (!activeMenuRow) return;
    const img = menuItems[activeMenuRow].image;
    if (!img) return;
    return <img className="menu__img" src={theme === "light" ? light[img] : dark[img]} />;
  };

  const mouseEnter = (name: string, index: number) => {
    if (level === 0) openMenu(name);
    enterRow(index);
  };

  const mouseLeave = () => {
    clearActiveMenuRow();
    //leaveMenu();
  };

  const left = `${level}px`;
  const height = level === 0 ? 'fit-content' : '490px';
  const minHeight = height;

  return (
    <div className={`menu ${theme}`} data-test="menu" onMouseLeave={mouseLeave} style={{height, minHeight, left}}>
      <ul className="menu-items">
        {menuItems.map((item, index) => (
          <li
            className={`menu-item ${( (activeMenuRow !== undefined) && (index === activeMenuRow) ) && 'active'}`}
            data-test="menu-item"
            key={index}
            onMouseEnter={() => mouseEnter(item.name, index)}
          >
            <Link href={item.link}><a className={`menu-item__a ${theme}`}>{item.name}</a></Link>
          </li>
        ))}
      </ul>

      {( (activeMenuRow !== undefined) && (menuItems[activeMenuRow]) && (menuItems[activeMenuRow].children[0]) && (expanded !== "none") )
        ? <Menu closeMenus={closeMenus} expanded={expanded} level={240} menuItems={menuItems[activeMenuRow].children} openMenu={openMenu} />
        : false
      }
    </div>
  );
}

interface ISubmenuImages {
  [index: string]: any;
}

type Props = {
  activeMenuRow: number | undefined;
  clearActiveMenuRow(): void;
  closeMenus(): void;
  enterRow(row: number): void;
  expanded: string;
  leaveMenu(): void;
  level: number;
  menuItems: IMenuItem[];
  openMenu(name: string): void;
  theme: string;
};