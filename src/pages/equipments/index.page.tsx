'use client';

import Link from 'next/link';

import { ExpandCollapse, Pagination, ResultsPerPage } from '../../components';
import { useTypedSelector as useSelector }            from '../../store';
import { useSearch }                                  from '../../utils/useSearch';

//const url = "https://s3.amazonaws.com/nobsc-images-01/equipment/";

export default function Equipments() {
  const { params, addFilter, removeFilter } = useSearch();

  const currEquipmentTypes = params.filters?.equipmentTypes;

  const equipmentTypes = useSelector(state => state.data.equipmentTypes);
  //const filters =        useSelector(state => state.search.filters);
  //const sorts =          useSelector(state => state.search.sorts);
  
  //const resultTerm        useSelector(state = state.search.resultTerm);
  const results =        useSelector(state => state.search.results);
  const totalResults =   useSelector(state => state.search.totalResults);
  const totalPages =     useSelector(state => state.search.totalPages);

  return (
    <div className="search-results two-col-b">
      <div className="two-col-b-left">
        <h1>Equipment</h1>
        <p>{totalResults} total results and {totalPages} total pages</p>

        <div id="filters">
          <span>Filter by:</span>

          <ExpandCollapse headingWhileCollapsed="Equipment Types">
            <div className="filter-group">
              <p>Equipment Types</p>
              {equipmentTypes.map(({ id, name }) => (
                <span key={id}>
                  <input
                    type="checkbox"
                    checked={currEquipmentTypes?.includes(name) ? true : false}
                    onChange={() => currEquipmentTypes?.includes(name) ? removeFilter("equipmentTypes", name) : addFilter("equipmentTypes", name)}
                    />
                    <label>{name}</label>
                </span>
              ))}
            </div>
          </ExpandCollapse>
        </div>

        <Pagination />
        <ResultsPerPage />

        <div>
          {results ? results.map(e => (
            <div className="equipments" key={e.id}>
              <Link href={`/equipment/${e.id}`}>
                <div className="text">
                  <div className="name">{e.name}</div>
                  
                  <div className="type">{e.equipment_type_name}</div>
                </div>

                {/*<img src={`${url}/${e.image}.jpg`} />*/}
              </Link>
            </div>
          )) : <div>Loading...</div>}
        </div>

        <Pagination />
        <ResultsPerPage />
      </div>

      <div className="two-col-b-right"></div>
    </div>
  );
}
