'use client';

import Link                               from 'next/link';
import { Fragment, useContext, useState, useRef } from 'react';

import { ExpandCollapse, Pagination, ResultsPerPage } from '../../components';
import { useTypedSelector as useSelector }            from '../../store';
import { SearchContext }                              from '../../utils/SearchProvider';

//const url = "https://s3.amazonaws.com/nobsc-user-recipe/";

export default function Recipes() {
  const renders = useRef(0);
  renders.current++;
  const searchDriver = useContext(SearchContext);

  const currRecipeTypes = searchDriver.params.filters?.recipeTypes;
  const currMethods =     searchDriver.params.filters?.methods;
  const currCuisines =    searchDriver.params.filters?.cuisines;

  const recipeTypes =    useSelector(state => state.data.recipeTypes);
  const methods =        useSelector(state => state.data.methods);
  const cuisines =       useSelector(state => state.data.cuisines);
  const cuisineGroups = [
    {continent: "Africa",   cuisines: [...(cuisines.filter(c => c.continent === "AF"))]},
    {continent: "Americas", cuisines: [...(cuisines.filter(c => c.continent === "AM"))]},
    {continent: "Asia",     cuisines: [...(cuisines.filter(c => c.continent === "AS"))]},
    {continent: "Europe",   cuisines: [...(cuisines.filter(c => c.continent === "EU"))]},
    {continent: "Oceania",  cuisines: [...(cuisines.filter(c => c.continent === "OC"))]}
  ];  // TO DO: improve this
  //const resultTerm       useSelector(state = state.search.resultTerm);
  const results =        useSelector(state => state.search.results);
  const totalResults =   useSelector(state => state.search.totalResults);
  const totalPages =     useSelector(state => state.search.totalPages);

  const [ expandedFilter,  setExpandedFilter ] =  useState<string|null>(null);
  const [ nextRecipeTypes, setNextRecipeTypes ] = useState<string[]>(currRecipeTypes ?? []);
  const [ nextMethods,     setNextMethods ] =     useState<string[]>(currMethods ?? []);
  const [ nextCuisines,    setNextCuisines ] =    useState<string[]>(currCuisines ?? []);
  //const sorts =           params.filters?.sorts;

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) {
      setExpandedFilter(null);  // close the dropdown
      // if needed, re-search with updated filters
      if (name === "recipeTypes" && currRecipeTypes !== nextRecipeTypes) searchDriver.setFilters(name, nextRecipeTypes);
      if (name === "methods"     && currMethods !== nextMethods)         searchDriver.setFilters(name, nextMethods);
      if (name === "cuisines"    && currCuisines !== nextCuisines)       searchDriver.setFilters(name, nextCuisines);
    } else {
      setExpandedFilter(name);  // open the dropdown
    }
  };

  return (
    <div className="two-col">
      <div className="two-col-left search-results">
        <div style={{fontSize: "2rem", color: "red"}}>{renders.current}</div>
        <h1>Recipes</h1>
        <p>{totalResults} total results and {totalPages} total pages</p>

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
              {recipeTypes.map(({ id, name }) => (
                <span key={id}>
                  <input
                    type="checkbox"
                    defaultChecked={currRecipeTypes?.includes(name)}
                    checked={nextRecipeTypes.includes(name)}
                    onChange={() => {
                      setNextRecipeTypes(nextRecipeTypes?.includes(name) ? nextRecipeTypes.filter(v => v !== name) : [...nextRecipeTypes, name]);
                    }}
                  />
                  <label>{name}</label>
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
              {methods.map(({ id, name }) => (
                <span key={id}>
                  <input
                    type="checkbox"
                    defaultChecked={currMethods?.includes(name)}
                    checked={nextMethods.includes(name)}
                    onChange={() => {
                      setNextMethods(nextMethods?.includes(name) ? nextMethods.filter(v => v !== name) : [...nextMethods, name]);
                    }}
                  />
                  <label>{name}</label>
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
                  {group.cuisines.map(({ id, code, name }) => (
                    <span key={id}>
                      <input
                        type="checkbox"
                        defaultChecked={currCuisines?.includes(code)}
                        checked={nextCuisines.includes(code)}
                        onChange={() => {
                          setNextCuisines(nextCuisines?.includes(code) ? nextCuisines.filter(v => v !== code) : [...nextCuisines, code]);
                        }}
                      />
                      <label>{name}</label>
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
                <Link className="search-results-list-item" href={`/recipe?title=${r.title}`} key={r.id}>
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
