import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import qs from 'qs';
import { useEffect, useState } from 'react';

import { useData } from '../../../store';
import { ExpandCollapse } from '../../shared/ExpandCollapse';
import { LoaderSpinner } from '../../shared/LoaderSpinner';
import { useSearch } from '../../shared/search/hook';
import { Pagination, ResultsPerPage } from '../../shared/search';
import type { SearchRequest } from '../../shared/search/types';

export default function IngredientList() {
  const searchParams = useSearchParams();
  const params = qs.parse(searchParams.toString()) as SearchRequest;
  const { filters } = params;

  const { search_index, setSearchIndex, setFilters, found, search } = useSearch();
  const { ingredient_types } = useData();

  const [ expandedFilter, setExpandedFilter ] = useState<string|null>(null);
  const [ checkedIngredientTypes, setCheckedIngredientTypes ] =
    useState<string[]>(filters?.ingredient_types ?? []);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setSearchIndex('ingredients');
    search();
    setLoading(false);
  }, []);

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) {
      setExpandedFilter(null);  // close the dropdown
      // if needed, re-search with updated filters
      // TO DO: fix
      if (name === "ingredient_types" && checkedIngredientTypes !== filters?.ingredient_types) {
        setFilters(name, checkedIngredientTypes);
      }
    } else {
      setExpandedFilter(name);  // open the dropdown
    }
  };

  const { results, total_results, total_pages } = found;
  const url = 'https://s3.amazonaws.com/nobsc-official-uploads/ingredient';

  if (loading) return <LoaderSpinner />;

  return (
    <div className="two-col ingredient-list">
      <div className="two-col-left search-results">
        <h1>Ingredients</h1>
        <p>{total_results} total results and {total_pages} total pages</p>

        <div className="filters">
          <span className="filter-by">Filter by:</span>

          <ExpandCollapse
            headingWhileCollapsed={(
              <div className={`filter-name${expandedFilter === "ingredient_types" ? " active" : ""}`}>
                <span>Ingredient Types</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            headingWhileExpanded={(
              <div className={`filter-name${expandedFilter === "ingredient_types" ? " active" : ""}`}>
                <span>Ingredient Types</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            isDisabled={expandedFilter !== "ingredient_types" && expandedFilter !== null}
            handler={() => toggleFilterDropdown("ingredient_types")}
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

        <Pagination key={1} search_index={search_index} total_pages={total_pages} />
        <ResultsPerPage key={2} search_index={search_index} />

        <div className="search-results-list">
          {results
            ? results.map(i => (
              <Link
                className="search-results-list-item"
                href={`/ingredient/detail/${i.fullname}`}
                key={i.ingredient_id}
              >
                <img src={`${url}/${i.image_filename}.jpg`} />
                <h3>{i.fullname}</h3>
                <div className="type">{i.ingredient_type_name}</div>
              </Link>
            ))
            : <div>Loading...</div>}
        </div>

        <Pagination key={3} search_index={search_index} total_pages={total_pages} />
        <ResultsPerPage key={4} search_index={search_index} />
      </div>

      <div className="two-col-right"></div>
    </div>
  );
}
