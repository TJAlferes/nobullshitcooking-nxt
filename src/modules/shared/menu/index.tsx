import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu as ReactAimMenu, MenuItem } from 'react-aim-menu';

import { useAuth } from '../../../store';
import { useTheme } from '../../../store';
import { ExpandCollapse } from '../ExpandCollapse';
import { useSearch } from '../search/hook';
import type { SearchIndex } from '../search/types';

export function LeftNav({ isLeftNavOpen, setIsLeftNavOpen }: Props) {
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

          {active && (
            <div className="submenu">
              {submenuItems.map(item => active === item.parent && (
                <div className={`submenu-item${active === item.parent ? ' active' : ''}`}>
                  <Link
                    href="#"
                    onClick={() => {
                      setPreFilters(
                        item.searchIndex as SearchIndex,
                        item.filterName,
                        item.filterValues
                      );
                      setIsLeftNavOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
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
                        href="#"
                        onClick={() => {
                          setPreFilters(
                            subitem.searchIndex as SearchIndex,
                            subitem.filterName,
                            subitem.filterValues
                          );
                          setIsLeftNavOpen(false);
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

type Props = {
  isLeftNavOpen:    boolean;
  setIsLeftNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function NavLinks() {
  const { authname } = useAuth();

  return (
    <>
      <NavLink text="Home" to="/" />
      <hr />

      {authname !== '' && (
        <>
          <NavLink text={authname} to="/dashboard" />
          <NavLink text="Chat"     to="/chat" />
          <NavLink text="Friends"  to="/friends" />
          <hr />
        </>
      )}

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

function NavLink({ text, to }: NavLinkProps) {
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

type NavLinkProps = {
  text: string;
  to:   string;
};

const menuItems = [
  {name: 'Recipes',     link: '/recipes',     image: 'recipes'},
  {name: 'Methods',     link: '/recipes',     image: 'methods'},
  {name: 'Ingredients', link: '/ingredients', image: 'ingredients'},
  {name: 'Equipment',   link: '/equipment',   image: 'equipment'}
];

const submenuItems = [
  {parent: 'Recipes', name: 'Drinks',     searchIndex: "recipes", filterName: "recipeTypes", filterValues: ['Drink'],     image: null},
  {parent: 'Recipes', name: 'Appetizers', searchIndex: "recipes", filterName: "recipeTypes", filterValues: ['Appetizer'], image: null},
  {parent: 'Recipes', name: 'Mains',      searchIndex: "recipes", filterName: "recipeTypes", filterValues: ['Main'],      image: null},
  {parent: 'Recipes', name: 'Sides',      searchIndex: "recipes", filterName: "recipeTypes", filterValues: ['Side'],      image: null},
  {parent: 'Recipes', name: 'Desserts',   searchIndex: "recipes", filterName: "recipeTypes", filterValues: ['Dessert'],   image: null},
  {parent: 'Recipes', name: 'Soups',      searchIndex: "recipes", filterName: "recipeTypes", filterValues: ['Soup'],      image: null},
  {parent: 'Recipes', name: 'Salads',     searchIndex: "recipes", filterName: "recipeTypes", filterValues: ['Salad'],     image: null},
  {parent: 'Recipes', name: 'Stews',      searchIndex: "recipes", filterName: "recipeTypes", filterValues: ['Stew'],      image: null},
  {parent: 'Recipes', name: 'Casseroles', searchIndex: "recipes", filterName: "recipeTypes", filterValues: ['Casserole'], image: null},
  {parent: 'Recipes', name: 'Sauces',     searchIndex: "recipes", filterName: "recipeTypes", filterValues: ['Sauce'],     image: null},
  {parent: 'Recipes', name: 'Dressings',  searchIndex: "recipes", filterName: "recipeTypes", filterValues: ['Dressing'],  image: null},
  {parent: 'Recipes', name: 'Condiments', searchIndex: "recipes", filterName: "recipeTypes", filterValues: ['Condiment'], image: null},

  {parent: 'Methods', name: 'Chill and Freeze',                       searchIndex: "recipes", filterName: "methods", filterValues: ['Chill', 'Freeze'],                            image: null},
  {parent: 'Methods', name: 'Steam, Poach, Simmer, Boil, and Blanch', searchIndex: "recipes", filterName: "methods", filterValues: ['Steam', 'Poach', 'Simmer', 'Boil', 'Blanch'], image: null},
  {parent: 'Methods', name: 'Stew and Braise',                        searchIndex: "recipes", filterName: "methods", filterValues: ['Stew', 'Braise'],                             image: null},
  {parent: 'Methods', name: 'Bake, Roast, Toast, and Broil',          searchIndex: "recipes", filterName: "methods", filterValues: ['Bake', 'Roast', 'Toast', 'Broil'],            image: null},
  {parent: 'Methods', name: 'Saute, Fry, and Glaze',                  searchIndex: "recipes", filterName: "methods", filterValues: ['Saute', 'Fry', 'Glaze'],                      image: null},
  {parent: 'Methods', name: 'BBQ, Grill, and Smoke',                  searchIndex: "recipes", filterName: "methods", filterValues: ['BBQ', 'Grill', 'Smoke'],                      image: null},

  {parent: 'Ingredients', name: 'Fish and Shellfish',       searchIndex: "ingredients", filterName: "ingredientTypes", filterValues: ['Fish', 'Shellfish'],       image: null},
  {parent: 'Ingredients', name: 'Beef, Pork, and Poultry',  searchIndex: "ingredients", filterName: "ingredientTypes", filterValues: ['Beef', 'Pork', 'Poultry'], image: null},
  {parent: 'Ingredients', name: 'Eggs and Dairy',           searchIndex: "ingredients", filterName: "ingredientTypes", filterValues: ['Egg', 'Dairy'],            image: null},
  {parent: 'Ingredients', name: 'Beans and Vegetables',     searchIndex: "ingredients", filterName: "ingredientTypes", filterValues: ['Bean', 'Vegetable'],       image: null},
  {parent: 'Ingredients', name: 'Fruit',                    searchIndex: "ingredients", filterName: "ingredientTypes", filterValues: ['Fruit'],                   image: null},
  {parent: 'Ingredients', name: 'Seeds and Grains',         searchIndex: "ingredients", filterName: "ingredientTypes", filterValues: ['Seed', 'Grain'],           image: null},
  {parent: 'Ingredients', name: 'Oils',                     searchIndex: "ingredients", filterName: "ingredientTypes", filterValues: ['Oil'],                     image: null},
  {parent: 'Ingredients', name: 'Acids, Herbs, and Spices', searchIndex: "ingredients", filterName: "ingredientTypes", filterValues: ['Acid', 'Herb', 'Spice'],   image: null},

  {parent: 'Equipment', name: 'Cleaning',  searchIndex: "equipment", filterName: "equipmentTypes", filterValues: ['Cleaning'],  image: null},
  {parent: 'Equipment', name: 'Preparing', searchIndex: "equipment", filterName: "equipmentTypes", filterValues: ['Preparing'], image: null},
  {parent: 'Equipment', name: 'Cooking',   searchIndex: "equipment", filterName: "equipmentTypes", filterValues: ['Cooking'],   image: null},
  {parent: 'Equipment', name: 'Dining',    searchIndex: "equipment", filterName: "equipmentTypes", filterValues: ['Dining'],    image: null},
  {parent: 'Equipment', name: 'Storage',   searchIndex: "equipment", filterName: "equipmentTypes", filterValues: ['Storage'],   image: null}
];

        /*<NavLink text="Equipment" to="/products" /> (Products) (Maybe also Supply?)
          <hr />*/
