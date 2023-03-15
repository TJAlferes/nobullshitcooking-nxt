import Link                               from 'next/link';
import { useRouter }                      from 'next/router';
import qs                                 from 'qs';
import { useState }                       from 'react';
import { Menu as ReactAimMenu, MenuItem } from 'react-aim-menu';

import { useTypedSelector as useSelector } from '../../store';

export function LeftNav() {
  const authname =            useSelector(state => state.auth.authname);
  const userIsAuthenticated = useSelector(state => state.auth.userIsAuthenticated);
  const leftNav =             useSelector(state => state.menu.leftNav);

  const [ active, setActive ] = useState<string|null>(null);

  return !leftNav ? null : (
    <>
      <div className="shadow"></div>

      <nav className="left-nav">
        <div className="anchor">
          <ReactAimMenu className="menu" onMouseLeave={() => setActive(null)}>
            <div className="menu-items">
              {menuItems.map(item => (
                <MenuItem className={`menu-item${active === item.name ? ' active' : ''}`} onHover={() => setActive(item.name)}>
                  <Link href={item.link}>{item.name}</Link>
                </MenuItem>
              ))}

              <div className="main">
                <NavLink text="Home" to="/" />
                <hr />
                {userIsAuthenticated && (
                  <>
                    <NavLink text={authname} to="/dashboard" />
                    <NavLink text="Chat"     to="/chat" />
                    <NavLink text="Friends"  to="/friends" />
                    <hr />
                  </>
                )}
              </div>
            </div>

            {active && (
              <div className="submenu-items">
                {submenuItems.map(item => active === item.parent && (
                  <div className={`submenu-item${active === item.parent ? ' active' : ''}`}>
                    <Link href={item.link}>{item.name}</Link>
                  </div>
                ))}
              </div>
            )}
          </ReactAimMenu>
        </div>
      </nav>
    </>
  );
}

export const menuItems = [
  {name: 'Recipes',     link: '/recipes',     image: 'recipes'},
  {name: 'Methods',     link: '/recipes',     image: 'methods'},
  {name: 'Ingredients', link: '/ingredients', image: 'ingredients'},
  {name: 'Equipment',   link: '/equipment',   image: 'equipment'}
];

export const submenuItems = [
  {parent: 'Recipes', name: 'Drinks',     link: `/recipes?${rt(['Drinks'])}`,     image: null},
  {parent: 'Recipes', name: 'Appetizers', link: `/recipes?${rt(['Appetizers'])}`, image: null},
  {parent: 'Recipes', name: 'Mains',      link: `/recipes?${rt(['Mains'])}`,      image: null},
  {parent: 'Recipes', name: 'Sides',      link: `/recipes?${rt(['Sides'])}`,      image: null},
  {parent: 'Recipes', name: 'Desserts',   link: `/recipes?${rt(['Desserts'])}`,   image: null},
  {parent: 'Recipes', name: 'Soups',      link: `/recipes?${rt(['Soups'])}`,      image: null},
  {parent: 'Recipes', name: 'Salads',     link: `/recipes?${rt(['Salads'])}`,     image: null},
  {parent: 'Recipes', name: 'Stews',      link: `/recipes?${rt(['Stews'])}`,      image: null},
  {parent: 'Recipes', name: 'Casseroles', link: `/recipes?${rt(['Casseroles'])}`, image: null},
  {parent: 'Recipes', name: 'Sauces',     link: `/recipes?${rt(['Sauces'])}`,     image: null},
  {parent: 'Recipes', name: 'Dressings',  link: `/recipes?${rt(['Dressings'])}`,  image: null},
  {parent: 'Recipes', name: 'Condiments', link: `/recipes?${rt(['Condiments'])}`, image: null},

  {parent: 'Methods', name: 'Chill and Freeze',                       link: `/recipes?${m(['Chill', 'Freeze'])}`,                            image: null},
  {parent: 'Methods', name: 'Steam, Poach, Simmer, Boil, and Blanch', link: `/recipes?${m(['Steam', 'Poach', 'Simmer', 'Boil', 'Blanch'])}`, image: null},
  {parent: 'Methods', name: 'Stew and Braise',                        link: `/recipes?${m(['Stew', 'Braise'])}`,                             image: null},
  {parent: 'Methods', name: 'Bake, Roast, Toast, and Broil',          link: `/recipes?${m(['Bake', 'Roast', 'Toast', 'Broil'])}`,            image: null},
  {parent: 'Methods', name: 'Saute, Fry, and Glaze',                  link: `/recipes?${m(['Saute', 'Fry', 'Glaze'])}`,                      image: null},
  {parent: 'Methods', name: 'BBQ, Grill, and Smoke',                  link: `/recipes?${m(['BBQ', 'Grill', 'Smoke'])}`,                      image: null},

  {parent: 'Ingredients', name: 'Fish and Shellfish',       link: `/ingredients?${it(['Fish', 'Shellfish'])}`,        image: null},
  {parent: 'Ingredients', name: 'Meat and Poultry',         link: `/ingredients?${it(['Meat', 'Poultry'])}`,          image: null},
  {parent: 'Ingredients', name: 'Eggs and Dairy',           link: `/ingredients?${it(['Eggs', 'Dairy'])}`,            image: null},
  {parent: 'Ingredients', name: 'Beans and Vegetables',     link: `/ingredients?${it(['Beans', 'Vegetables'])}`,      image: null},
  {parent: 'Ingredients', name: 'Fruit',                    link: `/ingredients?${it(['Fruit'])}`,                    image: null},
  {parent: 'Ingredients', name: 'Seeds and Grains',         link: `/ingredients?${it(['Seeds', 'Grains'])}`,          image: null},
  {parent: 'Ingredients', name: 'Fats and Oils',            link: `/ingredients?${it(['Fats', 'Oils'])}`,             image: null},
  {parent: 'Ingredients', name: 'Acids, Herbs, and Spices', link: `/ingredients?${it(['Acids', 'Herbs', 'Spices'])}`, image: null},

  {parent: 'Equipment', name: 'Cleaning',  link: `/equipments?${et(['Cleaning'])}`,  image: null},
  {parent: 'Equipment', name: 'Preparing', link: `/equipments?${et(['Preparing'])}`, image: null},
  {parent: 'Equipment', name: 'Cooking',   link: `/equipments?${et(['Cooking'])}`,   image: null},
  {parent: 'Equipment', name: 'Dining',    link: `/equipments?${et(['Dining'])}`,    image: null},
  {parent: 'Equipment', name: 'Storage',   link: `/equipments?${et(['Storage'])}`,   image: null}
];

function rt(value: string[]) {
  return qs.stringify({recipeTypes: value});
}

function m(value: string[]) {
  return qs.stringify({methods: value});
}

function it(value: string[]) {
  return qs.stringify({ingredientTypes: value});
}

function et(value: string[]) {
  return qs.stringify({equipmentTypes: value});
}

function NavLink({ text, to }: NavLinkProps): JSX.Element {
  const { pathname } = useRouter();
  const theme =        useSelector(state => state.theme.theme);

  const backgroundColor = theme === "light" ? "#ddd" : "#444";
  const style =           (to === pathname) ? {backgroundColor} : {};

  return <Link href={to} style={style}>{`${text}`}</Link>;
}

type NavLinkProps = {
  text: string;
  to:   string;
};

        /*<NavLink text="Supplements" to="/page/guide/food/nutrition/supplements" />
          <NavLink text="Equipment" to="/supply/kitchen-equipment" />
          <hr />

          <NavLink text="Water Filtration" to="/page/promo/water-filtration" />
          <NavLink text="Tea" to="/page/promo/tea" />
          <NavLink text="Coffee" to="/page/promo/coffee" />
          <hr />

          <NavLink text="Outdoors" to="/page/promo/outdoors" />
          <NavLink text="Garden" to="/page/promo/garden" />
          <NavLink text="Tools" to="/page/promo/tools" />
          <hr />

          <NavLink text="Seasonal" to="/page/promo/seasonal" />
          <hr />

          <NavLink text="Charity" to="/page/site/charity" />*/
