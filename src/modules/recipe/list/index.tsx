import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import qs from 'qs';
import { Fragment, useEffect, /*useRef,*/ useState } from 'react';

import { CuisineView, useData } from '../../../store';
import { ExpandCollapse } from '../../shared/ExpandCollapse';
import { LoaderSpinner } from '../../shared/LoaderSpinner';
import { Pagination, ResultsPerPage } from '../../shared/search';
import type { SearchRequest } from '../../shared/search/types';
import { useSearch } from '../../shared/search/hook';

// TO DO: make a filter to include/exclude Public User Recipes
export default function RecipeList() {
  //const renders = useRef(0);
  //renders.current++;

  const searchParams = useSearchParams();
  const params = qs.parse(searchParams.toString()) as SearchRequest;
  const { filters, current_page, results_per_page } = params;

  const { router, found, search, setFilters } = useSearch();
  const { recipe_types, methods, cuisines } = useData();
  const cuisineGroups = groupCuisines(cuisines);

  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const [checkedRecipeTypes, setCheckedRecipeTypes] = useState<string[]>([]);
  const [checkedMethods, setCheckedMethods] = useState<string[]>([]);
  const [checkedCuisines, setCheckedCuisines] = useState<string[]>([]);
  //const sorts = filters?.sorts;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trySearch = async () => {
      if (!filters?.recipe_types) {
        setCheckedRecipeTypes([]);
      } else if (
        JSON.stringify(checkedRecipeTypes) !== JSON.stringify(filters?.recipe_types)
      ) {
        setCheckedRecipeTypes(filters.recipe_types);
      }

      if (!filters?.methods) {
        setCheckedMethods([]);
      } else if (
        JSON.stringify(checkedMethods) !== JSON.stringify(filters?.methods)
      ) {
        setCheckedMethods(filters.methods);
      }

      if (!filters?.cuisines) {
        setCheckedCuisines([]);
      } else if (
        JSON.stringify(checkedCuisines) !== JSON.stringify(filters?.cuisines)
      ) {
        setCheckedCuisines(filters.cuisines);
      }

      await search('recipes');

      setLoading(false);
    }

    if (router.isReady) trySearch();
  }, [
    router.isReady,
    JSON.stringify(filters),
    JSON.stringify(filters?.equipment_types),
    JSON.stringify(filters?.methods),
    JSON.stringify(filters?.cuisines),
    current_page,
    results_per_page
  ]);

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) {
      setExpandedFilter(null);  // close the dropdown
      // if needed, re-search with updated filters
      if (
        name === "recipe_types" &&
        JSON.stringify(checkedRecipeTypes) !== JSON.stringify(filters?.recipe_types)
      ) {
        setFilters(name, checkedRecipeTypes);
      }
      if (
        name === "methods" &&
        JSON.stringify(checkedMethods) !== JSON.stringify(filters?.methods)
      ) {
        setFilters(name, checkedMethods);
      }
      if (
        name === "cuisines" &&
        JSON.stringify(checkedCuisines) !== JSON.stringify(filters?.cuisines)
      ) {
        setFilters(name, checkedCuisines);
      }
    } else {
      setExpandedFilter(name);  // open the dropdown
    }
  };

  if (loading) return <LoaderSpinner />;

  const { results, total_results, total_pages } = found;
  const url = 'https://s3.amazonaws.com/nobsc-official-uploads/recipe';

  return (
    <div className="one-col search-results recipe-list">
      {/*<div style={{fontSize: "2rem", color: "red"}}>{renders.current}</div>*/}

      <h1>Recipes</h1>

      {results.length > 0
        ? (
          <div className="settings">
            <p className="info">
              {total_results} total results and {total_pages} total pages
            </p>

            <ResultsPerPage />

            <div className="filters">
              <span className="filter-by">Filter by:</span>

              <ExpandCollapse
                headingWhileCollapsed={(
                  <div className={`filter-name ${expandedFilter === "recipe_types" ? "active" : ""}`}>
                    <span>Recipe Types</span>
                    <img src="/images/header/down-arrow.png" width="8" height="6" />
                  </div>
                )}
                headingWhileExpanded={(
                  <div className={`filter-name ${expandedFilter === "recipe_types" ? "active" : ""}`}>
                    <span>Recipe Types</span>
                    <img src="/images/header/down-arrow.png" width="8" height="6" />
                  </div>
                )}
                isDisabled={expandedFilter !== "recipe_types" && expandedFilter !== null}
                handler={() => toggleFilterDropdown("recipe_types")}
              >{null}</ExpandCollapse>

              <ExpandCollapse
                headingWhileCollapsed={(
                  <div className={`filter-name ${expandedFilter === "methods" ? "active" : ""}`}>
                    <span>Methods</span>
                    <img src="/images/header/down-arrow.png" width="8" height="6" />
                  </div>
                )}
                headingWhileExpanded={(
                  <div className={`filter-name ${expandedFilter === "methods" ? "active" : ""}`}>
                    <span>Methods</span>
                    <img src="/images/header/down-arrow.png" width="8" height="6" />
                  </div>
                )}
                isDisabled={expandedFilter !== "methods" && expandedFilter !== null}
                handler={() => toggleFilterDropdown("methods")}
              >{null}</ExpandCollapse>

              <ExpandCollapse
                headingWhileCollapsed={(
                  <div className={`filter-name ${expandedFilter === "cuisines" ? "active" : ""}`}>
                    <span>Cuisines</span>
                    <img src="/images/header/down-arrow.png" width="8" height="6" />
                  </div>
                )}
                headingWhileExpanded={(
                  <div className={`filter-name ${expandedFilter === "cuisines" ? "active" : ""}`}>
                    <span>Cuisines</span>
                    <img src="/images/header/down-arrow.png" width="8" height="6" />
                  </div>
                )}
                isDisabled={expandedFilter !== "cuisines" && expandedFilter !== null}
                handler={() => toggleFilterDropdown("cuisines")}
              >{null}</ExpandCollapse>

              <div className={`filter-group ${expandedFilter === "recipe_types" ? "active" : ""}`}>
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

              <div className={`filter-group ${expandedFilter === "methods" ? "active" : ""}`}>
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

              <div className={`filter-group ${expandedFilter === "cuisines" ? "active" : ""}`}>
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
            </div>

            {/*<button onClick={() => router.push(pathname + '?' + createQueryString('sort', 'asc'))}>ASC</button>*/}
            {/*<button onClick={() => router.push(pathname + '?' + createQueryString('sort', 'desc'))}>DESC</button>*/}
          </div>
        )
        : false
      }
        
      <Pagination key={1} />

      <div className="search-results-list">
        {!results
          ? <div>Loading...</div>
          : results.length < 1
            ? <p className="no-results">No results found.</p>
            : results.map(r => (
              <Link
                className="search-results-list-item"
                href={`/recipe/detail/${encodeURIComponent(r.title!)}`}
                key={r.recipe_id}
              >
                <img src={`${url}/${r.image_filename}.jpg`} />
                <h3>{r.title}</h3>
                <div className="author">{r.author}</div>
                <div className="cuisine">{r.cuisine_name}</div>
                <div className="type">{r.recipe_type_name}</div>
              </Link>
            ))
        }
      </div>

      <Pagination key={2} />
    </div>
  );
}

function groupCuisines(cuisines: CuisineView[]) {
  return [
    {continent: "Africa",   cuisines: cuisines.filter(c => c.continent_code === "AF")},
    {continent: "Americas", cuisines: cuisines.filter(c => c.continent_code === "AM")},
    {continent: "Asia",     cuisines: cuisines.filter(c => c.continent_code === "AS")},
    {continent: "Europe",   cuisines: cuisines.filter(c => c.continent_code === "EU")},
    {continent: "Oceania",  cuisines: cuisines.filter(c => c.continent_code === "OC")}
  ];  // TO DO: improve this (Array.reduce?)
}
