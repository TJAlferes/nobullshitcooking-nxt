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

const url = "https://s3.amazonaws.com/nobsc-images-01/equipment/";

export function Equipments() {
  const router =       useRouter();
  const pathname =     usePathname();
  const searchParams = useSearchParams();

  const params = qs.parse(searchParams.toString()) as SearchRequest;

  const currEquipmentTypes = params.filters?.equipmentTypes;

  const dispatch =       useDispatch();
  const equipmentTypes = useSelector(state => state.data.equipmentTypes);

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
        <h1>Equipment</h1>

        <ExpandCollapse headingWhileCollapsed="Filter Results (Click here to expand)">
          <div className="search-results__filters">
            <span className="search-results__filter-title">Filter equipment by:</span>
            <Facet field="equipment_type_name" filterType="any" label="Equipment Types" show={5} />
          </div>
        </ExpandCollapse>

        {wasSearched && <ResultsPerPage options={[20, 50, 100]} />}
        {wasSearched && <PagingInfo />}
        <Paging />

        <div className="search-results__list">
          {results ? results.map((e: any) => (
            <div className="equipments" key={e.id.raw}>
              <Link href={`/equipment/${e.id.raw}`}>
                <div className="text">
                  <div className="name">{e.name.raw}</div>
                  <div className="type">{e.equipment_type_name.raw}</div>
                </div>
                <img src={`${url}/${e.image.raw}.jpg`} />
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
