import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu as ReactAimMenu, MenuItem } from 'react-aim-menu';

import { useAuth } from '../../../store';
import { useTheme } from '../../../store';
import { ExpandCollapse } from '../ExpandCollapse';
import { useSearch } from '../search/hook';
import type { SearchIndex } from '../search/types';

export function LeftNav({ isLeftNavOpen, setIsLeftNavOpen }: {
  isLeftNavOpen: boolean;
  setIsLeftNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setPreFilters } = useSearch();

  const [ active, setActive ] = useState<string | null>(null);

  return !isLeftNavOpen ? null : (
    <>
      <div className="shadow"></div>

      <nav className="left-nav">
        <ReactAimMenu className="menu" onMouseLeave={() => setActive(null)}>
          {menuItems.map(item => (
            <MenuItem
              className={`menu-item${active === item.name ? ' active' : ''}`}
              onHover={() => setActive(item.name)}
            >
              <Link href={item.link}>{item.name}</Link>
            </MenuItem>
          ))}
          <hr />
          <NavLinks />

          {active ? (
            <div className="submenu">
              {submenuItems.map(item => active === item.parent ? (
                <div className={`submenu-item${active === item.parent ? ' active' : ''}`}>
                  <Link
                    href={{hash: null}}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLeftNavOpen(false);
                      setPreFilters(
                        item.searchIndex as SearchIndex,
                        item.filterName,
                        item.filterValues
                      );
                    }}
                  >
                    {item.name}
                  </Link>
                </div>
              ) : false)}
            </div>
          ) : false}
        </ReactAimMenu>
      </nav>

      <nav className="left-nav--mobile">
        <div className="menu">
          {menuItems.map(item => (
            <>
              <hr />
              <ExpandCollapse
                headingWhileCollapsed={(
                  <div className="menu-item">
                    <Link href={item.link}>{item.name}</Link>
                    <img src="/images/header/down-arrow.png" width="8" height="6" />
                  </div>
                )}
                headingWhileExpanded={(
                  <div className="menu-item">
                    <Link href={item.link}>{item.name}</Link>
                    <img src="/images/header/down-arrow.png" width="8" height="6" />
                  </div>
                )}
              >
                {submenuItems
                  .filter(subitem => subitem.parent === item.name)
                  .map(subitem => (
                    <div className="submenu-item">
                      <Link
                        href={{hash: null}}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsLeftNavOpen(false);
                          setPreFilters(
                            subitem.searchIndex as SearchIndex,
                            subitem.filterName,
                            subitem.filterValues
                          );
                        }}
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))
                }
              </ExpandCollapse>
            </>
          ))}
        </div>

        <NavLinks />
      </nav>
    </>
  );
}

function NavLinks() {
  const { authname } = useAuth();

  return (
    <>
      <NavLink text="Home" to="/" />
      <hr />

      {authname !== '' ? (
        <>
          <NavLink text={authname} to="/dashboard" />
          <NavLink text="Chat"     to="/chat" />
          <NavLink text="Friends"  to="/friends" />
          <hr />
        </>
      ) : false}

      <NavLink text="Water"  to="/water" />
      <NavLink text="Tea"    to="/tea" />
      <NavLink text="Coffee" to="/coffee" />
      <hr />
      <NavLink text="Outdoors" to="/outdoors" />
      <NavLink text="Garden"   to="/garden" />
      <NavLink text="Tools"    to="/tools" />
    </>
  );
}

function NavLink({ text, to }: {
  text: string;
  to: string;
}) {
  const pathname = usePathname();
  const { theme } = useTheme();

  const backgroundColor = theme === "light" ? "#ddd" : "#444";

  const style = to === pathname ? {backgroundColor} : {};

  return (
    <div className="left-nav-item">
      <Link href={to} style={style}>{`${text}`}</Link>
    </div>
  );
}

const menuItems = [
  {name: 'Recipes',     link: '/recipe/list',     image: 'recipes'},
  {name: 'Methods',     link: '/recipe/list',     image: 'methods'},
  {name: 'Ingredients', link: '/ingredient/list', image: 'ingredients'},
  {name: 'Equipment',   link: '/equipment/list',  image: 'equipment'}
];

const submenuItems = [
  {parent: 'Recipes', name: 'Drinks',     searchIndex: "recipes", filterName: "recipe_types", filterValues: ['Drink'],     image: null},
  {parent: 'Recipes', name: 'Appetizers', searchIndex: "recipes", filterName: "recipe_types", filterValues: ['Appetizer'], image: null},
  {parent: 'Recipes', name: 'Mains',      searchIndex: "recipes", filterName: "recipe_types", filterValues: ['Main'],      image: null},
  {parent: 'Recipes', name: 'Sides',      searchIndex: "recipes", filterName: "recipe_types", filterValues: ['Side'],      image: null},
  {parent: 'Recipes', name: 'Desserts',   searchIndex: "recipes", filterName: "recipe_types", filterValues: ['Dessert'],   image: null},
  {parent: 'Recipes', name: 'Soups',      searchIndex: "recipes", filterName: "recipe_types", filterValues: ['Soup'],      image: null},
  {parent: 'Recipes', name: 'Salads',     searchIndex: "recipes", filterName: "recipe_types", filterValues: ['Salad'],     image: null},
  {parent: 'Recipes', name: 'Stews',      searchIndex: "recipes", filterName: "recipe_types", filterValues: ['Stew'],      image: null},
  {parent: 'Recipes', name: 'Casseroles', searchIndex: "recipes", filterName: "recipe_types", filterValues: ['Casserole'], image: null},
  {parent: 'Recipes', name: 'Sauces',     searchIndex: "recipes", filterName: "recipe_types", filterValues: ['Sauce'],     image: null},
  {parent: 'Recipes', name: 'Dressings',  searchIndex: "recipes", filterName: "recipe_types", filterValues: ['Dressing'],  image: null},
  {parent: 'Recipes', name: 'Condiments', searchIndex: "recipes", filterName: "recipe_types", filterValues: ['Condiment'], image: null},

  {parent: 'Methods', name: 'Chill and Freeze',                       searchIndex: "recipes", filterName: "methods", filterValues: ['Chill', 'Freeze'],                            image: null},
  {parent: 'Methods', name: 'Steam, Poach, Simmer, Boil, and Blanch', searchIndex: "recipes", filterName: "methods", filterValues: ['Steam', 'Poach', 'Simmer', 'Boil', 'Blanch'], image: null},
  {parent: 'Methods', name: 'Stew and Braise',                        searchIndex: "recipes", filterName: "methods", filterValues: ['Stew', 'Braise'],                             image: null},
  {parent: 'Methods', name: 'Bake, Roast, Toast, and Broil',          searchIndex: "recipes", filterName: "methods", filterValues: ['Bake', 'Roast', 'Toast', 'Broil'],            image: null},
  {parent: 'Methods', name: 'Saute, Fry, and Glaze',                  searchIndex: "recipes", filterName: "methods", filterValues: ['Saute', 'Fry', 'Glaze'],                      image: null},
  {parent: 'Methods', name: 'BBQ, Grill, and Smoke',                  searchIndex: "recipes", filterName: "methods", filterValues: ['BBQ', 'Grill', 'Smoke'],                      image: null},

  {parent: 'Ingredients', name: 'Fish and Shellfish',       searchIndex: "ingredients", filterName: "ingredient_types", filterValues: ['Fish', 'Shellfish'],       image: null},
  {parent: 'Ingredients', name: 'Beef, Pork, and Poultry',  searchIndex: "ingredients", filterName: "ingredient_types", filterValues: ['Beef', 'Pork', 'Poultry'], image: null},
  {parent: 'Ingredients', name: 'Eggs and Dairy',           searchIndex: "ingredients", filterName: "ingredient_types", filterValues: ['Egg', 'Dairy'],            image: null},
  {parent: 'Ingredients', name: 'Beans and Vegetables',     searchIndex: "ingredients", filterName: "ingredient_types", filterValues: ['Bean', 'Vegetable'],       image: null},
  {parent: 'Ingredients', name: 'Fruit',                    searchIndex: "ingredients", filterName: "ingredient_types", filterValues: ['Fruit'],                   image: null},
  {parent: 'Ingredients', name: 'Seeds and Grains',         searchIndex: "ingredients", filterName: "ingredient_types", filterValues: ['Seed', 'Grain'],           image: null},
  {parent: 'Ingredients', name: 'Oils',                     searchIndex: "ingredients", filterName: "ingredient_types", filterValues: ['Oil'],                     image: null},
  {parent: 'Ingredients', name: 'Acids, Herbs, and Spices', searchIndex: "ingredients", filterName: "ingredient_types", filterValues: ['Acid', 'Herb', 'Spice'],   image: null},

  {parent: 'Equipment', name: 'Cleaning',  searchIndex: "equipment", filterName: "equipment_types", filterValues: ['Cleaning'],  image: null},
  {parent: 'Equipment', name: 'Preparing', searchIndex: "equipment", filterName: "equipment_types", filterValues: ['Preparing'], image: null},
  {parent: 'Equipment', name: 'Cooking',   searchIndex: "equipment", filterName: "equipment_types", filterValues: ['Cooking'],   image: null},
  {parent: 'Equipment', name: 'Dining',    searchIndex: "equipment", filterName: "equipment_types", filterValues: ['Dining'],    image: null},
  {parent: 'Equipment', name: 'Storage',   searchIndex: "equipment", filterName: "equipment_types", filterValues: ['Storage'],   image: null}
];

        /*<NavLink text="Equipment" to="/products" /> (Products) (Maybe also Supply?)
          <hr />*/
