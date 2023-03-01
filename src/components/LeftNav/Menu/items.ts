export default [
  {name: 'Test', link: '/test', image: 'test', children: []},
  {name: 'Recipes', link: '/recipes', image: 'recipes', children: [
    {name: 'Drinks',     link: '/recipes?t=drinks',     image: null, children: []},
    {name: 'Appetizers', link: '/recipes?t=appetizers', image: null, children: []},
    {name: 'Mains',      link: '/recipes?t=mains',      image: null, children: []},
    {name: 'Sides',      link: '/recipes?t=sides',      image: null, children: []},
    {name: 'Desserts',   link: '/recipes?t=desserts',   image: null, children: []},
    {name: 'Soups',      link: '/recipes?t=soups',      image: null, children: []},
    {name: 'Salads',     link: '/recipes?t=salads',     image: null, children: []},
    {name: 'Stews',      link: '/recipes?t=stews',      image: null, children: []},
    {name: 'Casseroles', link: '/recipes?t=casseroles', image: null, children: []},
    {name: 'Sauces',     link: '/recipes?t=sauces',     image: null, children: []},
    {name: 'Dressings',  link: '/recipes?t=dressings',  image: null, children: []},
    {name: 'Condiments', link: '/recipes?t=condiments', image: null, children: []}
  ]},
  {name: 'Methods', link: '/recipes', image: 'methods', children: [
    {name: 'Chill and Freeze',                       link: '/recipes?m=chill&m=freeze',                         image: null, children: []},
    {name: 'Steam, Poach, Simmer, Boil, and Blanch', link: '/recipes?m=steam&m=poach&m=simmer&m=boil&m=blanch', image: null, children: []},
    {name: 'Stew and Braise',                        link: '/recipes?m=stew&m=braise',                          image: null, children: []},
    {name: 'Bake, Roast, Toast, and Broil',          link: '/recipes?m=bake&m=roast&m=toast&m=broil',           image: null, children: []},
    {name: 'Saute, Fry, and Glaze',                  link: '/recipes?m=saute&m=fry&m=glaze',                    image: null, children: []},
    {name: 'BBQ, Grill, and Smoke',                  link: '/recipes?m=bbq&m=grill&m=smoke',                    image: null, children: []}
  ]},
  {name: 'Ingredients', link: '/ingredients', image: 'ingredients', children: [
    {name: 'Fish and Shellfish',       link: '/ingredients?t=fish&t=shellfish',       image: null, children: []},
    {name: 'Meat and Poultry',         link: '/ingredients?t=meat&t=poultry',         image: null, children: []},
    {name: 'Eggs and Dairy',           link: '/ingredients?t=eggs&t=dairy',           image: null, children: []},
    {name: 'Beans and Vegetables',     link: '/ingredients?t=beans&t=vegetables',     image: null, children: []},
    {name: 'Fruit',                    link: '/ingredients?t=fruit',                  image: null, children: []},
    {name: 'Seeds and Grains',         link: '/ingredients?t=seeds&t=grains',         image: null, children: []},
    {name: 'Fats and Oils',            link: '/ingredients?t=fats&t=oils',            image: null, children: []},
    {name: 'Acids, Herbs, and Spices', link: '/ingredients?t=acids&t=herbs&t=spices', image: null, children: []}
  ]},
  {name: 'Equipment', link: '/equipment', image: 'equipment', children: [
    {name: 'Cleaning',  link: '/equipments?t=cleaning',  image: null, children: []},
    {name: 'Preparing', link: '/equipments?t=preparing', image: null, children: []},
    {name: 'Cooking',   link: '/equipments?t=cooking',   image: null, children: []},
    {name: 'Dining',    link: '/equipments?t=dining',    image: null, children: []},
    {name: 'Storage',   link: '/equipments?t=storage',   image: null, children: []}
  ]}
];
