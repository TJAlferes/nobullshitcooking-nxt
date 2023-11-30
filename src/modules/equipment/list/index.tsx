import Link from 'next/link';
import { useState } from 'react';

import { useData } from '../../../store';
import { ExpandCollapse } from '../../shared/ExpandCollapse';
import { useSearch } from '../../shared/search/hook';
import { Pagination, ResultsPerPage } from '../../shared/search';

export default function EquipmentList() {
  const { found, params, setFilters } = useSearch();

  const { equipment_types } = useData();

  const { results, total_results, total_pages } = found;

  const [ expandedFilter, setExpandedFilter ] = useState<string|null>(null);
  const [ checkedEquipmentTypes, setCheckedEquipmentTypes ] =
    useState<string[]>(params.filters?.equipment_types ?? []);

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) {
      setExpandedFilter(null);  // close the dropdown
      // if needed, re-search with updated filters
      const { filters } = params;
      if (name === "equipment_types" && checkedEquipmentTypes !== filters?.equipment_types) {
        setFilters(name, checkedEquipmentTypes);
      }
    } else {
      setExpandedFilter(name);  // open the dropdown
    }
  };

  return (
    <div className="two-col equipment-list">
      <div className="two-col-left search-results">
        <h1>Equipment</h1>
        <p>{total_results} total results and {total_pages} total pages</p>

        <div className="filters">
          <span className="filter-by">Filter by:</span>

          <ExpandCollapse
            headingWhileCollapsed={(
              <div className={`filter-name${expandedFilter === "equipment_types" ? " active" : ""}`}>
                <span>Equipment Types</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            headingWhileExpanded={(
              <div className={`filter-name${expandedFilter === "equipment_types" ? " active" : ""}`}>
                <span>Equipment Types</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            isDisabled={expandedFilter !== "equipment_types" && expandedFilter !== null}
            handler={() => toggleFilterDropdown("equipment_types")}
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

        <Pagination key={1} />
        <ResultsPerPage key={2} />
        
        <div className="search-results-list">
          {results
            ? results.map(e => (
              <Link
                className="search-results-list-item"
                href={`/equipment?name=${e.equipment_name}`}
                key={e.id}
              >
                <img src="/images/dev/knife-280-172.jpg" />
                <h3>{e.equipment_name}</h3>
                <div className="type">{e.equipment_type_name}</div>
              </Link>
            ))
            : <div>Loading...</div>}
        </div>

        <Pagination key={3} />
        <ResultsPerPage key={4} />
      </div>

      <div className="two-col-right"></div>
    </div>
  );
}

//const url = "https://s3.amazonaws.com/nobsc-images-01/equipment/";
