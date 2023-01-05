import { useLayoutEffect, useState } from 'react';

import { useTypedSelector as useSelector } from '../../../store';
import { MenuView } from './MenuView';

// This Menu component heavily borrows from    react-menu-aim   https://github.com/jasonslyvia/react-menu-aim
// which is a React mixin heavily inspired by  jQuery-menu-aim  https://github.com/kamens/jQuery-menu-aim
// All rights reserved by the original authors.

const DELAY =              200;  // ms delay when appearing to entering submenu
const MOUSE_LOCS_TRACKED = 3;    // number of past mouse locations to track
const TOLERANCE =          50;   // bigger = more forgivey when entering submenu

let lastDelayLoc: IMouseLocation | null;
let mouseLocs:    IMouseLocation[] = [];
let menuTimer:    ReturnType<typeof setTimeout> | null;

function offset(el: HTMLElement|null) {
  if (!el) return {left: 0, top: 0};
  const rect = el.getBoundingClientRect();
  return {left: rect.left + document.body.scrollLeft, top: rect.top + document.body.scrollTop,};
}

function outerWidth(el: HTMLElement|null) {
  if (!el) return;
  const style = getComputedStyle(el);  // el.currentStyle ||
  let _width = el.offsetWidth;
  _width += (parseInt(style.marginLeft, 10) || 0);
  return _width;
}

function outerHeight(el: HTMLElement|null) {
  if (!el) return;
  const style = getComputedStyle(el);  // el.currentStyle ||
  let _height = el.offsetHeight;
  _height += (parseInt(style.marginLeft, 10) || 0);
  return _height;
}

function slope(a: IMouseLocation, b: IMouseLocation) {
  return (b.y - a.y) / (b.x - a.x);
}

function getActivateDelay() {
  const menu: HTMLElement | null = document.querySelector('.menu');  // findDOMNode? ref? useRef? forwardRef?
  if (!menu) return 0;

  const menuOffset = offset(menu);
  const menuOuterHeight = outerHeight(menu);
  const menuOuterWidth = outerWidth(menu);
  if (!menuOuterWidth || !menuOuterHeight) return 0;

  const upperLeft =  {x: menuOffset.left,                  y: menuOffset.top - TOLERANCE};
  const upperRight = {x: menuOffset.left + menuOuterWidth, y: upperLeft.y};
  const lowerLeft =  {x: menuOffset.left,                  y: menuOffset.top + menuOuterHeight + TOLERANCE};
  const lowerRight = {x: menuOffset.left + menuOuterWidth, y: lowerLeft.y};

  const loc = mouseLocs[mouseLocs.length - 1];
  if (!loc) return 0;

  let prevLoc = mouseLocs[0];
  if (!prevLoc) prevLoc = loc;

  if ( (prevLoc.x < menuOffset.left) || (prevLoc.x > lowerRight.x) || (prevLoc.y < menuOffset.top) || (prevLoc.y > lowerRight.y) ) return 0;

  if ( (lastDelayLoc) && (loc.x === lastDelayLoc.x) && (loc.y === lastDelayLoc.y) ) return 0;

  const decreasingCorner = upperRight;
  const increasingCorner = lowerRight;
  const decreasingSlope = slope(loc, decreasingCorner);
  const increasingSlope = slope(loc, increasingCorner);
  const prevDecreasingSlope = slope(prevLoc, decreasingCorner);
  const prevIncreasingSlope = slope(prevLoc, increasingCorner);

  if ( (decreasingSlope < prevDecreasingSlope) && (increasingSlope > prevIncreasingSlope) ) {
    lastDelayLoc = loc;
    return DELAY;
  }

  lastDelayLoc = null;

  return 0;
}

export function Menu({ expanded, closeMenus, level, menuItems, openMenu }: Props): JSX.Element {
  const theme = useSelector(state => state.theme.theme);

  const [ activeMenuRow, setActiveMenuRow ] = useState<number | undefined>();

  useLayoutEffect(() => {  // useRef? forwardRef?
    document.addEventListener('mousemove', mouseMoveDocument, false);
    return () => {
      document.removeEventListener('mousemove', mouseMoveDocument);
      mouseLocs = [];
      if (menuTimer) clearTimeout(menuTimer);
      menuTimer = null;
    };
  });
  
  const enterRow = (row: number) => {
    if (menuTimer) clearTimeout(menuTimer);
    possiblyActivate(row);
  }

  const leaveMenu = () => {
    if (menuTimer) clearTimeout(menuTimer);
  }

  const mouseMoveDocument = (e: MouseEvent) => {
    mouseLocs.push({x: e.pageX, y: e.pageY});
    if (mouseLocs.length > MOUSE_LOCS_TRACKED) mouseLocs.shift();
  }

  const possiblyActivate = (row: number) => {
    const delay = getActivateDelay();
    if (delay) {
      menuTimer = setTimeout(() => {
        possiblyActivate(row);
      }, delay);
      return;
    }
    setActiveMenuRow(row);
    console.log('row: ', row);
  };

  const clearActiveMenuRow = () => setActiveMenuRow(undefined);

  return (
    <MenuView
      activeMenuRow={activeMenuRow}
      clearActiveMenuRow={clearActiveMenuRow}
      enterRow={enterRow}
      expanded={expanded}
      closeMenus={closeMenus}
      leaveMenu={leaveMenu}
      level={level}
      menuItems={menuItems}
      openMenu={openMenu}
      theme={theme}
    />
  );
}

export interface IMenuItem {
  name:     string;
  link:     string;
  image:    string | null;
  children: IMenuItem[];
}

interface IMouseLocation {
  x: number;
  y: number;
}

type Props = {
  closeMenus():           void;
  expanded:               string;
  level:                  number;
  menuItems:              IMenuItem[];
  openMenu(name: string): void;
};