'use client';

import Link                                       from 'next/link';
import { Fragment, useContext, useState, useRef } from 'react';

import { useTypedSelector as useSelector } from '../../../redux';
import { ExpandCollapse }                  from '../../shared/ExpandCollapse';
import { Pagination, ResultsPerPage }      from '../../shared/search';
import { SearchContext }                   from '../../shared/search/hook';

//const url = "https://s3.amazonaws.com/nobsc-user-recipe/";

// list of search results
// ONLY contains Official Recipes (and Public User Recipes???)
// DOES NOT contain Private User Recipes
export default function RecipeList() {
  const renders = useRef(0);
  renders.current++;
  const searchDriver = useContext(SearchContext);

  const recipe_types = useSelector(state => state.data.recipe_types);
  const methods      = useSelector(state => state.data.methods);
  const cuisines     = useSelector(state => state.data.cuisines);
  const cuisineGroups = [
    {continent: "Africa",   cuisines: [...(cuisines.filter(c => c.continent_code === "AF"))]},
    {continent: "Americas", cuisines: [...(cuisines.filter(c => c.continent_code === "AM"))]},
    {continent: "Asia",     cuisines: [...(cuisines.filter(c => c.continent_code === "AS"))]},
    {continent: "Europe",   cuisines: [...(cuisines.filter(c => c.continent_code === "EU"))]},
    {continent: "Oceania",  cuisines: [...(cuisines.filter(c => c.continent_code === "OC"))]}
  ];  // TO DO: improve this
  //const resultTerm       useSelector(state = state.search.resultTerm);
  const results       = useSelector(state => state.search.results);
  const total_results = useSelector(state => state.search.total_results);
  const total_pages   = useSelector(state => state.search.total_pages);

  const [ expandedFilter,     setExpandedFilter ]     = useState<string|null>(null);
  const [ checkedRecipeTypes, setCheckedRecipeTypes ] = useState<string[]>(searchDriver.params.filters?.recipe_types ?? []);
  const [ checkedMethods,     setCheckedMethods ]     = useState<string[]>(searchDriver.params.filters?.methods ?? []);
  const [ checkedCuisines,    setCheckedCuisines ]    = useState<string[]>(searchDriver.params.filters?.cuisines ?? []);
  //const sorts =           params.filters?.sorts;

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) {
      setExpandedFilter(null);  // close the dropdown
      
      // if needed, re-search with updated filters
      const { filters } = searchDriver.params;

      if (name === "recipeTypes" && checkedRecipeTypes !== filters?.recipe_types) {
        searchDriver.setFilters(name, checkedRecipeTypes);
      }

      if (name === "methods" && checkedMethods !== filters?.methods) {
        searchDriver.setFilters(name, checkedMethods);
      }

      if (name === "cuisines" && checkedCuisines !== filters?.cuisines) {
        searchDriver.setFilters(name, checkedCuisines);
      }
    } else {
      setExpandedFilter(name);  // open the dropdown
    }
  };

  return (
    <div className="two-col">
      <div className="two-col-left search-results">
        <div style={{fontSize: "2rem", color: "red"}}>{renders.current}</div>
        <h1>Recipes</h1>

        <p>{total_results} total results and {total_pages} total pages</p>

        <div className="filters">
          <span className="filter-by">Filter by:</span>

          <ExpandCollapse
            headingWhileCollapsed={(
              <div className={`filter-name${expandedFilter === "recipeTypes" ? " active" : ""}`}>
                <span>Recipe Types</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            headingWhileExpanded={(
              <div className={`filter-name${expandedFilter === "recipeTypes" ? " active" : ""}`}>
                <span>Recipe Types</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            isDisabled={expandedFilter !== "recipeTypes" && expandedFilter !== null}
            handler={() => toggleFilterDropdown("recipeTypes")}
          >
            <div className="filter-group">
              {recipe_types.map(({ recipe_type_id, recipe_type_name }) => (
                <span key={recipe_type_id}>
                  <input
                    type="checkbox"
                    checked={checkedRecipeTypes?.includes(recipe_type_name)}
                    onChange={() => {
                      setCheckedRecipeTypes(
                        checkedRecipeTypes?.includes(recipe_type_name)
                        ? checkedRecipeTypes.filter(v => v !== recipe_type_name)
                        : [...checkedRecipeTypes, recipe_type_name]
                      );
                    }}
                  />
                  <label>{recipe_type_name}</label>
                </span>
              ))}
            </div>
          </ExpandCollapse>

          <ExpandCollapse
            headingWhileCollapsed={(
              <div className={`filter-name${expandedFilter === "methods" ? " active" : ""}`}>
                <span>Methods</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            headingWhileExpanded={(
              <div className={`filter-name${expandedFilter === "methods" ? " active" : ""}`}>
                <span>Methods</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            isDisabled={expandedFilter !== "methods" && expandedFilter !== null}
            handler={() => toggleFilterDropdown("methods")}
          >
            <div className="filter-group">
              {methods.map(({ method_id, method_name }) => (
                <span key={method_id}>
                  <input
                    type="checkbox"
                    checked={checkedMethods?.includes(method_name)}
                    onChange={() => {
                      setCheckedMethods(
                        checkedMethods?.includes(method_name)
                        ? checkedMethods.filter(v => v !== method_name)
                        : [...checkedMethods, method_name]
                      );
                    }}
                  />
                  <label>{method_name}</label>
                </span>
              ))}
            </div>
          </ExpandCollapse>

          <ExpandCollapse
            headingWhileCollapsed={(
              <div className={`filter-name${expandedFilter === "cuisines" ? " active" : ""}`}>
                <span>Cuisines</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            headingWhileExpanded={(
              <div className={`filter-name${expandedFilter === "cuisines" ? " active" : ""}`}>
                <span>Cuisines</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            isDisabled={expandedFilter !== "cuisines" && expandedFilter !== null}
            handler={() => toggleFilterDropdown("cuisines")}
          >
            <div className="filter-group">
              {cuisineGroups.map(group => (
                <Fragment key={group.continent}>
                  <h4>{group.continent}</h4>
                  {group.cuisines.map(({ cuisine_id, country_code, cuisine_name }) => (
                    <span key={cuisine_id}>
                      <input
                        type="checkbox"
                        checked={checkedCuisines?.includes(country_code)}
                        onChange={() => {
                          setCheckedCuisines(
                            checkedCuisines?.includes(country_code)
                            ? checkedCuisines.filter(v => v !== country_code)
                            : [...checkedCuisines, country_code]
                          );
                        }}
                      />
                      <label>{cuisine_name}</label>
                    </span>
                  ))}
                </Fragment >
              ))}
            </div>
          </ExpandCollapse>
        </div>

        {/*<button onClick={() => router.push(pathname + '?' + createQueryString('sort', 'asc'))}>ASC</button>*/}
        {/*<button onClick={() => router.push(pathname + '?' + createQueryString('sort', 'desc'))}>DESC</button>*/}

        <Pagination />
        <ResultsPerPage />

        <div className="search-results-list">
          {
            results
              ? results.map(r => (
                <Link
                  className="search-results-list-item"
                  href={`/recipe?title=${r.title}`}
                  key={r.id}
                >
                  <img src="/images/dev/sushi-280-172.jpg" />
                  <h3>{r.title}</h3>
                  <div className="author">{r.author}</div>
                  <div className="cuisine">{r.cuisine_name}</div>
                  <div className="type">{r.recipe_type_name}</div>
                </Link>
              ))
              : <div>Loading...</div>
          }
        </div>

        <Pagination />
        <ResultsPerPage />
      </div>

      <div className="two-col-right"></div>
    </div>
  );
}

/*
r.recipe_image !== "nobsc-recipe-default"
  ? <img className="recipes-image" src={`${url}${r.recipe_image}-thumb`} />
  : <div className="image-default-100-62"></div>
*/