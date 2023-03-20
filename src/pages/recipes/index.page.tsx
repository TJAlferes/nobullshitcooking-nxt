'use client';

import Link         from 'next/link';
import { useState } from 'react';

import { ExpandCollapse, Pagination, ResultsPerPage } from '../../components';
import { useTypedSelector as useSelector }            from '../../store';
import { useSearch }                                  from '../../utils/useSearch';

//const url = "https://s3.amazonaws.com/nobsc-user-recipe/";

export default function Recipes() {
  const { params, addFilter, removeFilter } = useSearch();

  const currRecipeTypes = params.filters?.recipeTypes;
  const currMethods =     params.filters?.methods;
  const currCuisines =    params.filters?.cuisines;
  //const sorts =           params.filters?.sorts;

  const recipeTypes =    useSelector(state => state.data.recipeTypes);
  const methods =        useSelector(state => state.data.methods);
  const cuisines =       useSelector(state => state.data.cuisines);
  const cuisineGroups = [
    {
      continent: "Africa",
      cuisines: [...(cuisines.filter(c => c.continent === "AF"))]
    },
    {
      continent: "Americas",
      cuisines: [...(cuisines.filter(c => c.continent === "AM"))]
    },
    {
      continent: "Asia",
      cuisines: [...(cuisines.filter(c => c.continent === "AS"))]
    },
    {
      continent: "Europe",
      cuisines: [...(cuisines.filter(c => c.continent === "EU"))]
    },
    {
      continent: "Oceania",
      cuisines: [...(cuisines.filter(c => c.continent === "OC"))]
    }
  ];
  
  //const resultTerm       useSelector(state = state.search.resultTerm);
  const results =        useSelector(state => state.search.results);
  const totalResults =   useSelector(state => state.search.totalResults);
  const totalPages =     useSelector(state => state.search.totalPages);

  const [ expandedFilter, setExpandedFilter ] = useState<string|null>(null);

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) setExpandedFilter(null);
    else                         setExpandedFilter(name);
  };

  return (
    <div className="search-results two-col">
      <div className="two-col-left">
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
                    checked={currRecipeTypes?.includes(name) ? true : false}
                    onChange={() => currRecipeTypes?.includes(name) ? removeFilter("recipeTypes", name) : addFilter("recipeTypes", name)}
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
                    checked={currMethods?.includes(name)}
                    onChange={() => currMethods?.includes(name) ? removeFilter("methods", name) : addFilter("methods", name)}
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
                <>
                  <h4>{group.continent}</h4>
                  {group.cuisines.map(({ id, code, name }) => (
                    <span key={id}>
                      <input
                        type="checkbox"
                        checked={currCuisines?.includes(code)}
                        onChange={() => currCuisines?.includes(code) ? removeFilter("cuisines", code) : addFilter("cuisines", code)}
                      />
                      <label>{name}</label>
                    </span>
                  ))}
                </>
              ))}
            </div>
          </ExpandCollapse>
        </div>

        {/*<button onClick={() => router.push(pathname + '?' + createQueryString('sort', 'asc'))}>ASC</button>*/}
        {/*<button onClick={() => router.push(pathname + '?' + createQueryString('sort', 'desc'))}>DESC</button>*/}

        <Pagination />
        <ResultsPerPage />

        <div>
          {results ? results.map(r => (
            <div className="recipes" key={r.id}>
              <Link href={`/recipe/${r.id}`} className="recipes-link">
                <div className="text">
                  <div className="title">{r.title}</div>

                  <div className="author">{r.author}</div>

                  <div>
                    <div className="cuisine">{r.cuisine_name}</div>

                    <div className="type">{r.recipe_type_name}</div>
                  </div>
                </div>

                {/*
                  r.recipe_image !== "nobsc-recipe-default"
                  ? <img className="recipes-image" src={`${url}${r.recipe_image}-thumb`} />
                  : <div className="image-default-100-62"></div>
                */}
              </Link>
            </div>
          )) : <div>Loading...</div>}
        </div>

        <Pagination />
        <ResultsPerPage />
      </div>

      <div className="two-col-right"></div>
    </div>
  );
}
