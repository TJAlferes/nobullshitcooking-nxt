'use client';

import Link                                        from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect }                               from 'react';
import qs                                          from 'qs';

import { ExpandCollapse } from '../../components';
import {
  getResults,
  //setFilters,
  //addFilter,
  //removeFilter,
  //setSorts,
  //setCurrentPage,
  //setResultsPerPage
} from '../../store/search/actions';
import type { SearchRequest } from '../../store/search/types';
import {
  useTypedDispatch as useDispatch,
  useTypedSelector as useSelector
} from '../../store';

const url = "https://s3.amazonaws.com/nobsc-user-recipe/";

export default function Recipes() {
  const router =       useRouter();
  const pathname =     usePathname();
  const searchParams = useSearchParams();

  const params = qs.parse(searchParams.toString()) as SearchRequest;

  const currRecipeTypes = params.filters?.recipeTypes;
  const currMethods =     params.filters?.methods;
  const currCuisines =    params.filters?.cuisines;

  const dispatch =       useDispatch();
  const recipeTypes =    useSelector(state => state.data.recipeTypes);
  const methods =        useSelector(state => state.data.methods);
  const cuisines =       useSelector(state => state.data.cuisines);

  const term =           useSelector(state => state.search.term);
  //const filters =        useSelector(state => state.search.filters);  // not even needed? it is, because they may want to leave the page and come back to their same filters
  //const sorts =          useSelector(state => state.search.sorts);  // not even needed?
  const currentPage =    useSelector(state => state.search.currentPage);
  const resultsPerPage = useSelector(state => state.search.resultsPerPage);  // 20, 50, 100

  const results =        useSelector(state => state.search.results);
  const totalResults =   useSelector(state => state.search.totalResults);
  const totalPages =     useSelector(state => state.search.totalPages);

  useEffect(() => {
    //const params: SearchRequest = Object.fromEntries(searchParams.entries());
    const params = qs.parse(searchParams.toString()) as SearchRequest;

    if (!params.currentPage)    params.currentPage = "1";
    if (!params.resultsPerPage) params.resultsPerPage = "20";

    dispatch(getResults(qs.stringify(params)));
  }, [searchParams]);

  const addFilter = (filterName: string, filterValue: string) => {
    // TO DO: clean searchParams so that it matches SearchRequest
    const params = qs.parse(searchParams.toString()) as SearchRequest;

    if (params.filters) {
      if (params.filters[filterName]) params.filters[filterName]?.push(filterValue);
      else                            params.filters[filterName] = [filterValue];
    } else {
      params.filters = {
        [filterName]: [filterValue]
      };
    }
    params.currentPage = "1";
    if (!params.resultsPerPage) params.resultsPerPage = "20";

    router.push(pathname + '?' + qs.stringify(params));
  };

  const removeFilter = (filterName: string, filterValue: string) => {
    const params = qs.parse(searchParams.toString()) as SearchRequest;

    if (!params.filters) return;

    const removed = (params.filters?.[filterName]?.filter(v => v !== filterValue)) as string[];
    params.filters[filterName] = removed;

    params.currentPage = "1";
    if (!params.resultsPerPage) params.resultsPerPage = "20";

    router.push(pathname + '?' + qs.stringify(params));
  };

  const clearFilters = (filterName: string) => {
    const params = qs.parse(searchParams.toString()) as SearchRequest;

    delete params['filters']?.[filterName];
    params.currentPage = "1";

    router.push(pathname + '?' + qs.stringify(params));
  };

  const changeResultsPerPage = (e: SyntheticEvent) => {
    const params = qs.parse(searchParams.toString()) as SearchRequest;
    const value = (e.target as HTMLInputElement).value;

    params.currentPage = "1";
    params.resultsPerPage = `${value}`;

    router.push(pathname + '?' + qs.stringify(params));
  };

  const goToPage = (page: number) => {
    const params = qs.parse(searchParams.toString()) as SearchRequest;
    params.currentPage = `${page}`;
    router.push(pathname + '?' + qs.stringify(params));
  };

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
                  {/*
                  <div className="tags">
                    <div className="methods">{r.method_names.map((m: any) => <span className="method" key={m}>{m}</span>)}</div>
                    <div className="ingredients">{r.ingredient_names.map((i: any) => <span className="ingredient" key={i}>{i}</span>)}</div>
                  </div>
                  */}
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

function ResultsPerPage({ handler, resultsPerPage }: ResultsPerPageProps) {
  return (
    <div>
      <label>Results per page:</label>
      <select onChange={handler} value={resultsPerPage}>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
}

function Pagination({ totalPages, currentPage, handler }: PaginationProps) {
  if (totalPages <= 1) return null;

  const first =   1;
  const prev =    currentPage - 1;
  const curr =    currentPage;
  const next =    currentPage + 1;
  const last =    totalPages;

  return (
    <div>
                      <span onClick={() => handler(first)}>First</span>
      {curr > 1 &&    <span onClick={() => handler(prev)}>Prev</span>}
                      <span onClick={() => handler(curr)}>{curr}</span>
      {curr < last && <span onClick={() => handler(next)}>Next</span>}
                      <span onClick={() => handler(last)}>Last</span>
    </div>
  );
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type ResultsPerPageProps = {
  resultsPerPage:             string;
  handler(e: SyntheticEvent): void;
};

type PaginationProps = {
  totalPages:            number;
  currentPage:           number;
  handler(page: number): void;
};
