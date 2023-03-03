'use client';

import Link                       from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

//import { Facet, Paging, PagingInfo, ResultsPerPage, withSearch } from '../../components';
import { ExpandCollapse } from '../../components';
import {
  getResults,
  setFilters,
  addFilter,
  removeFilter,
  setSorts,
  setCurrentPage,
  setResultsPerPage
} from '../../store/search/actions';
import {
  useTypedDispatch as useDispatch,
  useTypedSelector as useSelector
} from '../../store';
import { endpoint } from '../../utils/api';
import './recipes.css';

const url = "https://s3.amazonaws.com/nobsc-user-recipe/";

export default function Recipes() {
  const router =          useRouter();
  const pathname =        usePathname();
  const searchParams =    useSearchParams();
  const currRecipeTypes = searchParams.get('t');
  const currMethods =     searchParams.get('m');
  const currCuisines =    searchParams.get('c');

  const dispatch =       useDispatch();
  const recipeTypes =    useSelector(state => state.data.recipeTypes);
  const methods =        useSelector(state => state.data.methods);
  const cuisines =       useSelector(state => state.data.cuisines);

  const term =           useSelector(state => state.search.term);
  const filters =        useSelector(state => state.search.filters);
  const sorts =          useSelector(state => state.search.sorts);
  const currentPage =    useSelector(state => state.search.currentPage);
  const resultsPerPage = useSelector(state => state.search.resultsPerPage);

  const results =        useSelector(state => state.search.results);
  const totalResults =   useSelector(state => state.search.totalResults);
  const startPage =      useSelector(state => state.search.startPage);
  const endPage =        useSelector(state => state.search.endPage);
  const totalPages =     useSelector(state => state.search.totalPages);

  useEffect(() => {
    // ?t=Drink&t=Main  -->  {recipeTypes: ["Drink", "Main"], methods: [], cuisines: []}

    // use useRouter or Link to set new searchParams. After a navigating, the curr page.js will receive an updated searchParams prop.

    function setFiltersFromURLParams(filterType: string) {
      
    }

    setFiltersFromURLParams("recipeTypes");
    setFiltersFromURLParams("methods");
    setFiltersFromURLParams("cuisines");
  }, [filters.recipeTypes, filters.methods, filters.cuisines]);

  useEffect(() => {
    dispatch(getResults());
  }, [filters.recipeTypes, filters.methods, filters.cuisines]);

  // Get a new searchParams string by merging the curr searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const pageNumbers = (currPage) => {
    const numbers = [];
    for (let i = 1; i <= viewPages; i++) {
      const startingAt = viewDisplay * (i - 1);
      if (i !== currPage) numbers.push(<span onClick={() => dispatch(getResults(s)tartingAt)} key={i}>{i}</span>);  // page number
      else                numbers.push(<span key={i}>{i}</span>);                                         // current page number
    }
    return numbers;
  };

  const paginate = () => {
    const display =        25;
    const currPage =       Math.floor((starting / display) + 1);
    const startingAtPrev = (starting == 0) ? starting : (starting - display);
    const startingAtNext = (starting + display);

    return (
      <div>
        <span>
          <span onClick={() => dispatch(getResults(1))}>First</span>
          {currentPage !== 1 &&     <span onClick={() => dispatch(getResults(s)tartingAtPrev)}>Prev</span>}
          {pageNumbers(currPage)}
          {currentPage !== pages && <span onClick={() => dispatch(getResults(s)tartingAtNext)}>Next</span>}
          <span onClick={() => dispatch(getResults(3))}>Last</span>
        </span>
      </div>
    );
  }

  return (
    <div className="recipes two-col-b">
      <div className="two-col-b-left">
        <h1>Recipes</h1>

        <p>{totalResults} total results for "{term}"</p>

        <div id="filters">
          <span>Filter by:</span>

          <div className="filter-group">
            <label>Recipe Types</label>
            {recipeTypes.map(({ id, name }) => (
              <span key={id}>
                <input
                  type="checkbox"
                  checked={filters.recipeTypes.includes(name)}
                  onChange={() => filters.recipeTypes.includes(name) ? removeFilter("recipeTypes", name) : addFilter("recipeTypes", name)}
                />
                <label>{name}</label>
              </span>
            ))}
          </div>

          <div className="filter-group">
            <label>Methods</label>
            {methods.map(({ id, name }) => (
              <span key={id}>
                <input
                  type="checkbox"
                  checked={filters.methods.includes(name)}
                  onChange={() => filters.methods.includes(name) ? removeFilter("methods", name) : addFilter("methods", name)}
                />
                <label>{name}</label>
              </span>
            ))}
          </div>

          <div className="filter-group">
            <label>Cuisines</label>
            {cuisines.map(({ id, code, name }) => (
              <span key={id}>
                <input
                  type="checkbox"
                  checked={filters.cuisines.includes(code)}
                  onChange={() => filters.cuisines.includes(code) ? removeFilter("cuisines", code) : addFilter("cuisines", code)}
                />
                <label>{name}</label>
              </span>
            ))}
          </div>
        </div>

        {/*<button onClick={() => router.push(pathname + '?' + createQueryString('sort', 'asc'))}>ASC</button>*/}
        {/*<button onClick={() => router.push(pathname + '?' + createQueryString('sort', 'desc'))}>DESC</button>*/}
        <Link href={pathname + '?' + createQueryString('sort', 'asc')}>ASC</Link>
        <Link href={pathname + '?' + createQueryString('sort', 'desc')}>DESC</Link>

        {(pages > 1) && paginate()}

        <div>
          {recipes.map(({ id, name, image }) => (
            <div key={id}>
              <Link to={`/food/recipe/${id}`}>
                <div>{name}</div>
                <img src={`https://s3.amazonaws.com/nobsc-images-01/recipes/recipe/${image}.jpg`} />
              </Link>
            </div>
          ))}
        </div>

        {(pages > 1) && paginate()}
      </div>

      <div className="two-col-b-right"></div>
    </div>
  );
}

/*export function Recipes({ filters, results }: PropsFromContext) {
  return (
    <div className="search-results two-col-b">
      <div className="two-col-b-left">
        <h1>Recipes</h1>

        <ExpandCollapse headingWhileCollapsed="Filter Results (Click here to expand)">
          <div className="search-results__filters">
            <span className="search-results__filter-title">Filter recipes by:</span>
          </div>
        </ExpandCollapse>

        <ResultsPerPage options={[20, 50, 100]} />
        <PagingInfo />
        <Paging />

        <div className="search-results__list">
          {results ? results.map((r: any) => (
            <div className="recipes" key={r.id}>
              <Link href={`/recipe/${r.id}`} className="recipes-link">
                <div className="text">
                  <div className="title">{r.title}</div>
                  <div className="author">{r.author}</div>
                  <div>
                    <div className="cuisine">{r.cuisine_name}</div>
                    <div className="type">{r.recipe_type_name}</div>
                  </div>
                  <div className="tags">
                    <div className="methods">{r.method_names.map((m: any) => <span className="method" key={m}>{m}</span>)}</div>
                    <div className="ingredients">{r.ingredient_names.map((i: any) => <span className="ingredient" key={i}>{i}</span>)}</div>
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

        <PagingInfo />
        <Paging />
      </div>

      <div className="two-col-b-right"></div>
    </div>
  );
}

type PropsFromContext = {
  filters?:    any;
  results:     any;
}

const mapContextToProps = ({ filters, results }: PropsFromContext) => ({filters, results});

export default withSearch(mapContextToProps)(Recipes);*/
