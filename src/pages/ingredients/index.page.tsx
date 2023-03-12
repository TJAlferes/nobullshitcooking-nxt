'use client';

import Link                                        from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect }                               from 'react';
import qs                                          from 'qs';

import { ExpandCollapse, Pagination, ResultsPerPage } from '../../components';
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
import { useTypedDispatch as useDispatch, useTypedSelector as useSelector } from '../../store';

const url = "https://s3.amazonaws.com/nobsc-images-01/ingredients/";

export function Ingredients() {
  const router =       useRouter();
  const pathname =     usePathname();
  const searchParams = useSearchParams();

  const params = qs.parse(searchParams.toString()) as SearchRequest;

  const currIngredientTypes = params.filters?.ingredientTypes;

  const dispatch =        useDispatch();
  const ingredientTypes = useSelector(state => state.data.ingredientTypes);

  const term =           useSelector(state => state.search.term);
  //const filters =        useSelector(state => state.search.filters);  // not even needed? it is, because they may want to leave the page and come back to their same filters
  //const sorts =          useSelector(state => state.search.sorts);  // not even needed?
  const currentPage =    useSelector(state => state.search.currentPage);
  const resultsPerPage = useSelector(state => state.search.resultsPerPage);  // 20, 50, 100

  const results =        useSelector(state => state.search.results);
  const totalResults =   useSelector(state => state.search.totalResults);
  const totalPages =     useSelector(state => state.search.totalPages);

  return (
    <div className="search-results two-col-b">
      <div className="two-col-b-left">
        <h1>Ingredients</h1>

        <ExpandCollapse headingWhileCollapsed="Filter Results (Click here to expand)">
          <div className="search-results__filters">
            <span className="search-results__filter-title">Filter ingredients by:</span>
            <Facet field="ingredient_type_name" filterType="any" label="Ingredient Types" show={18} />
          </div>
        </ExpandCollapse>

        {wasSearched && <ResultsPerPage options={[20, 50, 100]} />}
        {wasSearched && <PagingInfo />}
        <Paging />

        <div className="search-results__list">
          {results ? results.map((i: any) => (
            <div className="ingredients" key={i.id.raw}>
              <Link href={`/ingredient/${i.id.raw}`}>
                <div className="text">
                  <div className="fullname">{i.fullname.raw}</div>
                  <div className="type">{i.ingredient_type_name.raw}</div>
                </div>
                <img src={`${url}${i.image.raw}.jpg`} />
              </Link>
            </div>
          )) : <div>Loading...</div>}
        </div>

        {wasSearched && <PagingInfo />}
        <Paging />
      </div>

      <div className="two-col-b-right">
      </div>
    </div>
  );
}
