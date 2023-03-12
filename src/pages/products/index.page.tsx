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

const url = "https://s3.amazonaws.com/images-01/products/";

export function Products() {
  const router =       useRouter();
  const pathname =     usePathname();
  const searchParams = useSearchParams();

  const params = qs.parse(searchParams.toString()) as SearchRequest;

  const currProductCategories = params.filters?.productCategories;
  const currProductTypes =      params.filters?.productTypes;

  const dispatch =          useDispatch();
  const productCategories = useSelect(state => state.data.productCategories);
  const productTypes =      useSelector(state => state.data.productTypes);

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
        <h1>Products</h1>

        <ExpandCollapse headingWhileCollapsed="Filter Results (Click here to expand)">
          <div className="search-results__filters">
            <span className="search-results__filter-title">Filter products by:</span>
            <Facet field="product_type_name" filterType="any" label="Product Types" show={5} />
          </div>
        </ExpandCollapse>
        
        {wasSearched && <ResultsPerPage options={[20, 50, 100]} />}
        {wasSearched && <PagingInfo />}
        <Paging />

        <div className="search-results__list">
          {results ? results.map((p: any) => (
            <div className="products" key={p.id.raw}>
              <Link href={`/product/${p.id.raw}`}>
                <div className="text">
                  <div className="fullname">{p.fullname.raw}</div>
                  <div className="type">{p.product_type_name.raw}</div>
                </div>
                {p.image.raw !== "nobsc-product-default"
                  ? <img className="products-image" src={`${url}${p.image.raw}-thumb`} />
                  : <div className="image-default-100-62"></div>
                }
              </Link>
            </div>
          )) : <div>Loading...</div>}
        </div>

        {wasSearched && <PagingInfo />}
        <Paging />
      </div>

      <div className="two-col-b-right"></div>
    </div>
  );
}
