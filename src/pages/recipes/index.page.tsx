'use client';

import Link from 'next/link';

import { ExpandCollapse, Pagination, ResultsPerPage } from '../../components';
import { useTypedSelector as useSelector }            from '../../store';
import { useSearch }                                  from '../../utils/useSearch';

const url = "https://s3.amazonaws.com/nobsc-user-recipe/";

export default function Recipes() {
  const {
    params,
    addFilter,
    removeFilter,
    clearFilters,
    changeResultsPerPage,
    goToPage
  } = useSearch();
  const currRecipeTypes = params.filters?.recipeTypes;
  const currMethods =     params.filters?.methods;
  const currCuisines =    params.filters?.cuisines;

  const recipeTypes =    useSelector(state => state.data.recipeTypes);
  const methods =        useSelector(state => state.data.methods);
  const cuisines =       useSelector(state => state.data.cuisines);

  const term =           useSelector(state => state.search.term);
  //const filters =        useSelector(state => state.search.filters);  // needed, because they may want to leave the page and come back to their same filters
  //const sorts =          useSelector(state => state.search.sorts);  // needed, because they may want to leave the page and come back to their same sorts
  const currentPage =    useSelector(state => state.search.currentPage);
  const resultsPerPage = useSelector(state => state.search.resultsPerPage);  // 20, 50, 100

  const results =        useSelector(state => state.search.results);
  const totalResults =   useSelector(state => state.search.totalResults);
  const totalPages =     useSelector(state => state.search.totalPages);

  return (
    <div className="recipes two-col-b">
      <div className="two-col-b-left">
        <h1>Recipes</h1>

        <p>{totalResults} total results for "{term}"</p>

        <div id="filters">
          <span>Filter by:</span>

          <div className="filter-group">
            <p>Recipe Types</p>
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

          <div className="filter-group">
            <p>Methods</p>
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

          <div className="filter-group">
            <p>Cuisines</p>
            {cuisines.map(({ id, code, name }) => (
              <span key={id}>
                <input
                  type="checkbox"
                  checked={currCuisines?.includes(code)}
                  onChange={() => currCuisines?.includes(code) ? removeFilter("cuisines", code) : addFilter("cuisines", code)}
                />
                <label>{name}</label>
              </span>
            ))}
          </div>
        </div>

        {/*<button onClick={() => router.push(pathname + '?' + createQueryString('sort', 'asc'))}>ASC</button>*/}
        {/*<button onClick={() => router.push(pathname + '?' + createQueryString('sort', 'desc'))}>DESC</button>*/}

        <Pagination totalPages={totalPages} currentPage={Number(currentPage)} handler={goToPage} />
        <ResultsPerPage handler={changeResultsPerPage} resultsPerPage={resultsPerPage ?? "20"} />

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

                {r.recipe_image !== "nobsc-recipe-default"
                  ? <img className="recipes-image" src={`${url}${r.recipe_image}-thumb`} />
                  : <div className="image-default-100-62"></div>
                }
              </Link>
            </div>
          )) : <div>Loading...</div>}
        </div>

        <Pagination totalPages={totalPages} currentPage={Number(currentPage)} handler={goToPage} />
        <ResultsPerPage handler={changeResultsPerPage} resultsPerPage={resultsPerPage ?? "20"} />
      </div>

      <div className="two-col-b-right"></div>
    </div>
  );
}
