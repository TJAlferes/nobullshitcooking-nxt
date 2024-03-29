import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import qs from 'qs';
import { useEffect, /*useRef,*/ useState } from 'react';

import { useData } from '../../../store';
import { ExpandCollapse } from '../../shared/ExpandCollapse';
import { LoaderSpinner } from '../../shared/LoaderSpinner';
import { useSearch } from '../../shared/search/hook';
import { Pagination, ResultsPerPage } from '../../shared/search';
import type { SearchRequest } from '../../shared/search/types';

export default function EquipmentList() {
  //const renders = useRef(0);
  //renders.current++;

  const searchParams = useSearchParams();
  const params = qs.parse(searchParams.toString()) as SearchRequest;
  const { filters, current_page, results_per_page } = params;

  const { router, found, search, setFilters } = useSearch();
  const { equipment_types } = useData();

  const [ expandedFilter, setExpandedFilter ] = useState<string|null>(null);
  const [ checkedEquipmentTypes, setCheckedEquipmentTypes ] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trySearch = async () => {
      if (!filters?.equipment_types) {
        setCheckedEquipmentTypes([]);
      } else if (
        JSON.stringify(checkedEquipmentTypes) !== JSON.stringify(filters?.equipment_types)
      ) {
        setCheckedEquipmentTypes(filters.equipment_types);
      }
      await search('equipment');
      setLoading(false);
    }
    if (router.isReady) trySearch();
  }, [
    router.isReady,
    JSON.stringify(filters?.equipment_types),
    current_page,
    results_per_page
  ]);

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) {
      setExpandedFilter(null);  // close the dropdown
      // if needed, re-search with updated filters
      if (
        name === "equipment_types" &&
        JSON.stringify(checkedEquipmentTypes) !== JSON.stringify(filters?.equipment_types)
      ) {
        setFilters(name, checkedEquipmentTypes);
      }
    } else {
      setExpandedFilter(name);  // open the dropdown
    }
  };

  if (loading) return <LoaderSpinner />;

  const { results, total_results, total_pages } = found;
  const url = 'https://s3.amazonaws.com/nobsc-official-uploads/equipment';

  return (
    <div className="one-col search-results equipment-list">
      {/*<div style={{fontSize: "2rem", color: "red"}}>{renders.current}</div>*/}

      <h1>Equipment</h1>

      {results.length > 0
        ? (
          <div className="top-settings">
            <p className="info">
              {total_results} total results and {total_pages} total pages
            </p>

            <div className="filters">
              <span className="filter-by">Filter by:</span>

              <ExpandCollapse
                headingWhileCollapsed={(
                  <div className={`filter-name ${expandedFilter === "equipment_types" ? "active" : ""}`}>
                    <span>Equipment Types</span>
                    <img src="/images/header/down-arrow.png" width="8" height="6" />
                  </div>
                )}
                headingWhileExpanded={(
                  <div className={`filter-name ${expandedFilter === "equipment_types" ? "active" : ""}`}>
                    <span>Equipment Types</span>
                    <img src="/images/header/down-arrow.png" width="8" height="6" />
                  </div>
                )}
                isDisabled={expandedFilter !== "equipment_types" && expandedFilter !== null}
                handler={() => toggleFilterDropdown("equipment_types")}
              >{null}</ExpandCollapse>

              <div className={`filter-group ${expandedFilter === "equipment_types" ? "active" : ""}`}>
                {equipment_types.map(({ equipment_type_id, equipment_type_name }) => (
                  <span key={equipment_type_id}>
                    <input
                      type="checkbox"
                      checked={checkedEquipmentTypes.includes(equipment_type_name)}
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
            </div>
          </div>
        )
        : false
      }
        
      <div className="search-results-list">
        {!results
          ? <div>Loading...</div>
          : results.length < 1
            ? <p className="no-results">No results found.</p>
            : results.map(e => (
              <Link
                className="search-results-list-item"
                href={`/equipment/detail/${encodeURIComponent(e.equipment_name!)}`}
                key={e.equipment_id}
              >
                <img src={`${url}/${e.image_filename}.jpg`} />
                <h3>{e.equipment_name}</h3>
                <div className="type">{e.equipment_type_name}</div>
              </Link>
            ))
        }
      </div>

      {results.length > 0
        ? (
          <div className="bottom-settings">
            <ResultsPerPage />
            <Pagination />
          </div>
        )
        : false
      }
    </div>
  );
}
