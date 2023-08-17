'use client';

import Link                     from 'next/link';
import { useContext, useState } from 'react';

import { ExpandCollapse, Pagination, ResultsPerPage } from '../../components';
import { useTypedSelector as useSelector }            from '../../store';
import { SearchContext }                              from '../../utils/SearchProvider';

//const url = "https://s3.amazonaws.com/nobsc-images-01/equipment/";

export default function Equipments() {
  const searchDriver = useContext(SearchContext);

  const equipment_types = useSelector(state => state.data.equipment_types);
  //const resultTerm       useSelector(state = state.search.resultTerm);
  const results =        useSelector(state => state.search.results);
  const total_results =   useSelector(state => state.search.total_results);
  const total_pages =     useSelector(state => state.search.total_pages);

  const [ expandedFilter, setExpandedFilter ] =               useState<string|null>(null);
  const [ checkedEquipmentTypes, setCheckedEquipmentTypes ] = useState<string[]>(searchDriver.params.filters?.equipment_types ?? []);

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) {
      setExpandedFilter(null);
      if (name === "equipmentTypes" && checkedEquipmentTypes !== searchDriver.params.filters?.equipment_types) searchDriver.setFilters(name, checkedEquipmentTypes);
    } else {
      setExpandedFilter(name);
    }
  };

  return (
    <div className="two-col">
      <div className="two-col-left search-results">
        <h1>Equipment</h1>
        <p>{total_results} total results and {total_pages} total pages</p>

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
              {equipment_types.map(({ equipment_type_id, equipment_type_name }) => (
                <span key={equipment_type_id}>
                  <input
                    type="checkbox"
                    checked={checkedEquipmentTypes?.includes(equipment_type_name)}
                    onChange={() => {
                      setCheckedEquipmentTypes(
                        checkedEquipmentTypes?.includes(equipment_type_name)
                        ? checkedEquipmentTypes.filter(v => v !== equipment_type_name)
                        : [...checkedEquipmentTypes, equipment_type_name]
                      );
                    }}
                  />
                    <label>{equipment_type_name}</label>
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
                <Link className="search-results-list-item" href={`/equipment?name=${e.equipment_name}`} key={e.id}>
                  <img src="/images/dev/knife-280-172.jpg" />
                  <h3>{e.equipment_name}</h3>
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