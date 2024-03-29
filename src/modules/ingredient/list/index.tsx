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
  const { filters, current_page, results_per_page } = params;

  const { router, found, search, setFilters } = useSearch();
  const { ingredient_types } = useData();

  const [ expandedFilter, setExpandedFilter ] = useState<string|null>(null);
  const [ checkedIngredientTypes, setCheckedIngredientTypes ] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trySearch = async () => {
      if (!filters?.ingredient_types) {
        setCheckedIngredientTypes([]);
      } else if (
        JSON.stringify(checkedIngredientTypes) !== JSON.stringify(filters?.ingredient_types)
      ) {
        setCheckedIngredientTypes(filters.ingredient_types);
      }
      await search('ingredients');
      setLoading(false);
    }
    if (router.isReady) trySearch();
  }, [
    router.isReady,
    JSON.stringify(filters?.ingredient_types),
    current_page,
    results_per_page
  ]);

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) {
      setExpandedFilter(null);  // close the dropdown
      // if needed, re-search with updated filters
      // TO DO: fix
      if (
        name === "ingredient_types" &&
        JSON.stringify(checkedIngredientTypes) !== JSON.stringify(filters?.ingredient_types)
      ) {
        setFilters(name, checkedIngredientTypes);
      }
    } else {
      setExpandedFilter(name);  // open the dropdown
    }
  };

  if (loading) return <LoaderSpinner />;

  const { results, total_results, total_pages } = found;
  const url = 'https://s3.amazonaws.com/nobsc-official-uploads/ingredient';

  return (
    <div className="one-col search-results ingredient-list">
      <h1>Ingredients</h1>

      {results.length > 0
        ? (
          <div className="top-settings">
            <p className="info">
              {total_results} total results and {total_pages} total pages
            </p>

            <div className="filters">
              <span className="filter-by">Filter by:</span>

              <ExpandCollapse
                headingWhileCollapsed={(
                  <div className={`filter-name ${expandedFilter === "ingredient_types" ? "active" : ""}`}>
                    <span>Ingredient Types</span>
                    <img src="/images/header/down-arrow.png" width="8" height="6" />
                  </div>
                )}
                headingWhileExpanded={(
                  <div className={`filter-name ${expandedFilter === "ingredient_types" ? "active" : ""}`}>
                    <span>Ingredient Types</span>
                    <img src="/images/header/down-arrow.png" width="8" height="6" />
                  </div>
                )}
                isDisabled={expandedFilter !== "ingredient_types" && expandedFilter !== null}
                handler={() => toggleFilterDropdown("ingredient_types")}
              >{null}</ExpandCollapse>
            </div>

            <div className={`filter-group ${expandedFilter === "ingredient_types" ? "active" : ""}`}>
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
          </div>
        )
        : false
      }

      <div className="search-results-list">
        {!results
          ? <div>Loading...</div>
          : results.length < 1
            ? <p className="no-results">No results found.</p>
            : results.map(i => (
              <Link
                className="search-results-list-item"
                href={`/ingredient/detail/${encodeURIComponent(i.fullname!)}`}
                key={i.ingredient_id}
              >
                <img src={`${url}/${i.image_filename}.jpg`} />
                <h3>{i.fullname}</h3>
                <div className="type">{i.ingredient_type_name}</div>
              </Link>
            ))
        }
      </div>

      {results.length > 0
        ? (
          <div className="bottom-settings">
            <ResultsPerPage />
            <Pagination />
          </div>
        )
        : false
      }
    </div>
  );
}
