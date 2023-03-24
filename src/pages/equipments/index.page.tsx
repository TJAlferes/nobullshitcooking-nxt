'use client';

import Link                     from 'next/link';
import { useContext, useState } from 'react';

import { ExpandCollapse, Pagination, ResultsPerPage } from '../../components';
import { useTypedSelector as useSelector }            from '../../store';
import { SearchContext }                              from '../../utils/SearchProvider';

//const url = "https://s3.amazonaws.com/nobsc-images-01/equipment/";

export default function Equipments() {
  const searchDriver = useContext(SearchContext);

  const equipmentTypes = useSelector(state => state.data.equipmentTypes);
  //const resultTerm       useSelector(state = state.search.resultTerm);
  const results =        useSelector(state => state.search.results);
  const totalResults =   useSelector(state => state.search.totalResults);
  const totalPages =     useSelector(state => state.search.totalPages);

  const [ expandedFilter, setExpandedFilter ] =               useState<string|null>(null);
  const [ checkedEquipmentTypes, setCheckedEquipmentTypes ] = useState<string[]>(searchDriver.params.filters?.equipmentTypes ?? []);

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) {
      setExpandedFilter(null);
      if (name === "equipmentTypes" && checkedEquipmentTypes !== searchDriver.params.filters?.equipmentTypes) searchDriver.setFilters(name, checkedEquipmentTypes);
    } else {
      setExpandedFilter(name);
    }
  };

  return (
    <div className="two-col">
      <div className="two-col-left search-results">
        <h1>Equipment</h1>
        <p>{totalResults} total results and {totalPages} total pages</p>

        <div className="filters">
          <span className="filter-by">Filter by:</span>

          <ExpandCollapse
            headingWhileCollapsed={(
              <div className={`filter-name${expandedFilter === "equipmentTypes" ? " active" : ""}`}>
                <span>Equipment Types</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            headingWhileExpanded={(
              <div className={`filter-name${expandedFilter === "equipmentTypes" ? " active" : ""}`}>
                <span>Equipment Types</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            isDisabled={expandedFilter !== "equipmentTypes" && expandedFilter !== null}
            handler={() => toggleFilterDropdown("equipmentTypes")}
          >
            <div className="filter-group">
              {equipmentTypes.map(({ id, name }) => (
                <span key={id}>
                  <input
                    type="checkbox"
                    checked={checkedEquipmentTypes?.includes(name)}
                    onChange={() => {
                      setCheckedEquipmentTypes(checkedEquipmentTypes?.includes(name) ? checkedEquipmentTypes.filter(v => v !== name) : [...checkedEquipmentTypes, name]);
                    }}
                  />
                    <label>{name}</label>
                </span>
              ))}
            </div>
          </ExpandCollapse>
        </div>

        <Pagination />
        <ResultsPerPage />
        
        <div className="search-results-list">
          {
            results
              ? results.map(e => (
                <Link className="search-results-list-item" href={`/equipment?name=${e.name}`} key={e.id}>
                  <img src="/images/dev/knife-280-172.jpg" />
                  <h3>{e.name}</h3>
                  <div className="type">{e.equipment_type_name}</div>
                </Link>
              ))
              : <div>Loading...</div>
          }
        </div>

        <Pagination />
        <ResultsPerPage />
      </div>

      <div className="two-col-right"></div>
    </div>
  );
}
