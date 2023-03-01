import Link from 'next/link';
import React from 'react';

import { Menu, MenuItem } from './index';

const url = 'https://s3.amazonaws.com/nobsc-images-01/header/dropdowns/';
// TO DO: shorten file names
const submenuImages: ISubmenuImages = {
  'cuisines':    `${url}cuisines.png`,
  'equipment':   `${url}ingredients.png`,  // finish
  'exercises':   `${url}exercises.png`,
  'ingredients': `${url}ingredients.png`,
  'kitchen':     `${url}kitchen.png`,
  'methods':     `${url}methods.png`,
  'nutrition':   `${url}nutrition.png`,
  'principles':  `${url}principles.png`,
  'recipes':     `${url}ingredients.png`  // finish
};

function SubmenuImage(activeMenuRow: number|undefined, menuItems: MenuItem[]) {
  if (!activeMenuRow) return;
  const img = menuItems[activeMenuRow]?.image;
  if (!img) return;
  return <img className="menu-image" src={submenuImages[img]} />;
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
  openMenu
}: Props): JSX.Element {
  const left =      `${level}px`;
  const height =    level === 0 ? 'fit-content' : '490px';
  const minHeight = height;

  const mouseEnter = (name: string, index: number) => {
    if (level === 0) openMenu(name);
    enterRow(index);
  };

  const mouseLeave = () => {
    clearActiveMenuRow();
    //leaveMenu();
  };

  return (
    <div className="menu" data-test="menu" onMouseLeave={mouseLeave} style={{height, minHeight, left}}>
      <ul className="menu-items">
        {menuItems.map((item, index) => (
          <li
            className={`menu-item ${activeMenuRow && (activeMenuRow === index) && 'active'}`}
            data-test="menu-item"
            key={index}
            onMouseEnter={() => mouseEnter(item.name, index)}
          >
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>

      {activeMenuRow && menuItems[activeMenuRow]?.children && (expanded !== "none") && (
        <Menu
          closeMenus={closeMenus}
          expanded={expanded}
          level={240}
          menuItems={menuItems[activeMenuRow]?.children!}
          openMenu={openMenu}
        />
      )}
    </div>
  );
}

interface ISubmenuImages {
  [index: string]: any;
}

type Props = {
  activeMenuRow:          number | undefined;
  clearActiveMenuRow():   void;
  closeMenus():           void;
  enterRow(row: number):  void;
  expanded:               string;
  leaveMenu():            void;
  level:                  number;
  menuItems:              MenuItem[];
  openMenu(name: string): void;
};