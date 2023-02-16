import { Facet, Paging, PagingInfo, ResultsPerPage, withSearch } from '@elastic/react-search-ui';
import Link from 'next/link';

import { ExpandCollapse } from '../../components';

const url = "https://s3.amazonaws.com/nobsc-user-recipe/";

export function Recipes({ facets, filters, results, wasSearched }: PropsFromContext) {
  return (
    <div className="search-results two-col-b">
      <div className="two-col-b-left">
        <h1>Recipes</h1>

        <ExpandCollapse headingWhileCollapsed="Filter Results (Click here to expand)">
          <div className="search-results__filters">
            <span className="search-results__filter-title">Filter recipes by:</span>
            <Facet field="recipe_type_name" filterType="any" label="Recipe Types" show={12} />
            <Facet field="cuisine_name"     filterType="any" label="Cuisines"     show={24} />
            <Facet field="method_names"     filterType="any" label="Methods"      show={24} />
          </div>
        </ExpandCollapse>

        {wasSearched && <ResultsPerPage options={[20, 50, 100]} />}
        {wasSearched && <PagingInfo />}
        <Paging />

        <div className="search-results__list">
          {results ? results.map((r: any) => (
            <div className="recipes" key={r.id.raw}>
              <Link href={`/recipe/${r.id.raw}`} className="recipes-link">
                <div className="text">
                  <div className="title">{r.title.raw}</div>
                  <div className="author">{r.author.raw}</div>
                  <div>
                    <div className="cuisine">{r.cuisine_name.raw}</div>
                    <div className="type">{r.recipe_type_name.raw}</div>
                  </div>
                  <div className="tags">
                    <div className="methods">{r.method_names.raw.map((m: any) => <span className="method" key={m}>{m}</span>)}</div>
                    <div className="ingredients">{r.ingredient_names.raw.map((i: any) => <span className="ingredient" key={i}>{i}</span>)}</div>
                  </div>
                </div>
                {r.recipe_image.raw !== "nobsc-recipe-default"
                  ? <img className="recipes-image" src={`${url}${r.recipe_image.raw}-thumb`} />
                  : <div className="image-default-100-62"></div>
                }
              </Link>
            </div>
          )) : <div>Loading...</div>}
        </div>

        {wasSearched && <PagingInfo />}
        <Paging />
      </div>

      <div className="two-col-b-right"></div>
    </div>
  );
}

type PropsFromContext = {
  facets:      any;
  filters?:    any;
  results:     any;
  wasSearched: boolean;
}

const mapContextToProps = ({ facets, filters, results, wasSearched }: PropsFromContext) => ({facets, filters, results, wasSearched});

export default withSearch(mapContextToProps)(Recipes);

              /*facets={{
                recipe_type_name: [
                  {
                    data: [
                      {count: 1, value: "Drink"},
                      {count: 1, value: "Appetizer"},
                      {count: 1, value: "Main"},
                      {count: 1, value: "Side"},
                      {count: 1, value: "Dessert"},
                      {count: 1, value: "Soup"},
                      {count: 1, value: "Salad"},
                      {count: 1, value: "Stew"},
                      {count: 1, value: "Casserole"},
                      {count: 1, value: "Sauce"},
                      {count: 1, value: "Dressing"},
                      {count: 1, value: "Condiment"}
                    ],
                    field: "recipe_type_name",
                    type: "value"
                  }
                ]
              }}*/

              /*facets={{
                cuisine_name: [
                  {
                    data: [
                      {count: 1, value: "Russian"},
                      {count: 1, value: "German"},
                      {count: 1, value: "Turkish"},
                      {count: 1, value: "French"},
                      {count: 1, value: "Italian"},
                      {count: 1, value: "Mexican"},
                      {count: 1, value: "Greek"},
                      {count: 1, value: "Irish"},
                      {count: 1, value: "Chinese"},
                      {count: 1, value: "Indian"},
                      {count: 1, value: "Japanese"},
                      {count: 1, value: "Iranian"},
                      {count: 1, value: "Spanish"},
                      {count: 1, value: "Thai"},
                      {count: 1, value: "Vietnamese"},
                      {count: 1, value: "Korean"},
                      {count: 1, value: "Swedish"},
                      {count: 1, value: "Norwegian"},
                      {count: 1, value: "Polish"},
                      {count: 1, value: "Hungarian"},
                      {count: 1, value: "Brazilian"},
                      {count: 1, value: "Argentinian"},
                      {count: 1, value: "Nigerian"},
                      {count: 1, value: "Other"}
                    ],
                    field: "cuisine_name",
                    type: "value"
                  },
                ]
              }}*/

              /*facets={{
                method_names: [
                  {
                    data: [
                      {count: 1, value: "No-Cook"},
                      {count: 1, value: "Chill"},
                      {count: 1, value: "Freeze"},
                      {count: 1, value: "Microwave"},
                      {count: 1, value: "Toast"},
                      {count: 1, value: "Steam"},
                      {count: 1, value: "Poach"},
                      {count: 1, value: "Simmer"},
                      {count: 1, value: "Boil"},
                      {count: 1, value: "Blanch"},
                      {count: 1, value: "Stew"},
                      {count: 1, value: "Braise"},
                      {count: 1, value: "Bake"},
                      {count: 1, value: "Roast"},
                      {count: 1, value: "Broil"},
                      {count: 1, value: "Saute"},
                      {count: 1, value: "Pan-Fry"},
                      {count: 1, value: "Shallow-Fry"},
                      {count: 1, value: "Deep-Fry"},
                      {count: 1, value: "Stir-Fry"},
                      {count: 1, value: "Glaze"},
                      {count: 1, value: "BBQ"},
                      {count: 1, value: "Grill"},
                      {count: 1, value: "Smoke"}
                    ],
                    field: "method_names",
                    type: "value"
                  },
                ]
              }}*/
