'use client';

import Link                     from 'next/link';
import { useContext, useState } from 'react';

import { ExpandCollapse, Pagination, ResultsPerPage } from '../../components';
import { useTypedSelector as useSelector }            from '../../store';
import { SearchContext }                              from '../../utils/SearchProvider';

//const url = "https://s3.amazonaws.com/nobsc-images-01/ingredients/";

export default function Ingredients() {
  const searchDriver = useContext(SearchContext);

  const ingredient_types = useSelector(state => state.data.ingredient_types);
  //const resultTerm        useSelector(state = state.search.resultTerm);
  const results =         useSelector(state => state.search.results);
  const total_results =    useSelector(state => state.search.total_results);
  const total_pages =      useSelector(state => state.search.total_pages);

  const [ expandedFilter, setExpandedFilter ] =                 useState<string|null>(null);
  const [ checkedIngredientTypes, setCheckedIngredientTypes ] = useState<string[]>(searchDriver.params.filters?.ingredient_types ?? []);

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) {
      setExpandedFilter(null);
      if (name === "ingredientTypes" && checkedIngredientTypes !== searchDriver.params.filters?.ingredient_types) searchDriver.setFilters(name, checkedIngredientTypes);
    } else {
      setExpandedFilter(name);
    }
  };

  return (
    <div className="two-col">
      <div className="two-col-left search-results">
        <h1>Ingredients</h1>
        <p>{total_results} total results and {total_pages} total pages</p>

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
              {ingredient_types.map(({ ingredient_type_id, ingredient_type_name }) => (
                <span key={ingredient_type_id}>
                  <input
                    type="checkbox"
                    checked={checkedIngredientTypes?.includes(ingredient_type_name)}
                    onChange={() => {
                      setCheckedIngredientTypes(
                        checkedIngredientTypes?.includes(ingredient_type_name)
                        ? checkedIngredientTypes.filter(v => v !== ingredient_type_name)
                        : [...checkedIngredientTypes, ingredient_type_name]
                      );
                    }}
                  />
                  <label>{ingredient_type_name}</label>
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
