import Link         from 'next/link';
import { useState } from 'react';

import { useTypedSelector as useSelector } from '../../../redux';
import { getItem }                         from '../../general/localStorage';
import { ExpandCollapse }                  from '../../shared/ExpandCollapse';
import { useSearch }                       from '../../shared/search/hook';
import { Pagination, ResultsPerPage }      from '../../shared/search';

export default function IngredientList() {
  const searchDriver = useSearch();

  const ingredient_types = useSelector(state => state.data.ingredient_types);
  const { results, total_results, total_pages } = getItem("found");

  const [ expandedFilter, setExpandedFilter ] = useState<string|null>(null);

  const [ checkedIngredientTypes, setCheckedIngredientTypes ] =
    useState<string[]>(searchDriver.params.filters?.ingredient_types ?? []);

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) {
      setExpandedFilter(null);  // close the dropdown

      // if needed, re-search with updated filters
      const { filters } = searchDriver.params;

      if (name === "ingredientTypes" && checkedIngredientTypes !== filters?.ingredient_types) {
        searchDriver.setFilters(name, checkedIngredientTypes);
      }
    } else {
      setExpandedFilter(name);  // open the dropdown
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
                <Link
                  className="search-results-list-item"
                  href={`/ingredient?fullname=${i.fullname}`}
                  key={i.id}
                >
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

//const url = "https://s3.amazonaws.com/nobsc-images-01/ingredients/";
