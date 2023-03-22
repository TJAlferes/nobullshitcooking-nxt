'use client';

import Link                     from 'next/link';
import { useContext, useState } from 'react';

import { ExpandCollapse, Pagination, ResultsPerPage } from '../../components';
import { useTypedSelector as useSelector }            from '../../store';
import { SearchContext }                              from '../../utils/SearchProvider';

//const url = "https://s3.amazonaws.com/nobsc-images-01/ingredients/";

export default function Ingredients() {
  const searchDriver = useContext(SearchContext);

  const currIngredientTypes = searchDriver.params.filters?.ingredientTypes;

  const ingredientTypes = useSelector(state => state.data.ingredientTypes);
  //const resultTerm        useSelector(state = state.search.resultTerm);
  const results =         useSelector(state => state.search.results);
  const totalResults =    useSelector(state => state.search.totalResults);
  const totalPages =      useSelector(state => state.search.totalPages);

  const [ expandedFilter, setExpandedFilter ] = useState<string|null>(null);
  const [ nextIngredientTypes, setNextIngredientTypes ] = useState<string[]>(currIngredientTypes ?? []);

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) {
      setExpandedFilter(null);
      if (name === "ingredientTypes" && currIngredientTypes !== nextIngredientTypes) searchDriver.setFilters(name, nextIngredientTypes);
    } else {
      setExpandedFilter(name);
    }
  };

  return (
    <div className="two-col">
      <div className="two-col-left search-results">
        <h1>Ingredients</h1>
        <p>{totalResults} total results and {totalPages} total pages</p>

        <div className="filters">
          <span className="filter-by">Filter by:</span>

          <ExpandCollapse
            headingWhileCollapsed={(
              <div className={`filter-name${expandedFilter === "ingredientTypes" ? " active" : ""}`}>
                <span>Ingredient Types</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            headingWhileExpanded={(
              <div className={`filter-name${expandedFilter === "ingredientTypes" ? " active" : ""}`}>
                <span>Ingredient Types</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            isDisabled={expandedFilter !== "ingredientTypes" && expandedFilter !== null}
            handler={() => toggleFilterDropdown("ingredientTypes")}
          >
            <div className="filter-group">
              {ingredientTypes.map(({ id, name }) => (
                <span key={id}>
                  <input
                    type="checkbox"
                    defaultChecked={currIngredientTypes?.includes(name)}
                    checked={nextIngredientTypes.includes(name)}
                    onChange={() => {
                      setNextIngredientTypes(nextIngredientTypes?.includes(name) ? nextIngredientTypes.filter(v => v !== name) : [...nextIngredientTypes, name]);
                    }}
                  />
                  <label>{name}</label>
                </span>
              ))}
            </div>
          </ExpandCollapse>
        </div>

        <Pagination />
        <ResultsPerPage />

        <div className="search-results-list">
          {
            results
              ? results.map(i => (
                <Link className="search-results-list-item" href={`/ingredient?fullname=${i.fullname}`} key={i.id}>
                  <img src="/images/dev/peas-280-172.jpg" />
                  <h3>{i.fullname}</h3>
                  <div className="type">{i.ingredient_type_name}</div>
                </Link>
              ))
              : <div>Loading...</div>
          }
        </div>

        <Pagination />
        <ResultsPerPage />
      </div>

      <div className="two-col-right">
      </div>
    </div>
  );
}
