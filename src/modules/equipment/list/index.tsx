import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useEffect, useRef, useState } from 'react';

import { useData } from '../../../store';
import { ExpandCollapse } from '../../shared/ExpandCollapse';
import { LoaderSpinner } from '../../shared/LoaderSpinner';
import { useSearch } from '../../shared/search/hook';
import { Pagination, ResultsPerPage } from '../../shared/search';
import type { SearchRequest } from '../../shared/search/types';

export default function EquipmentList() {
  const renders = useRef(0);
  renders.current++;

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = qs.parse(searchParams.toString()) as SearchRequest;
  const { filters } = params;

  const { setFilters, search, found } = useSearch();
  const { equipment_types } = useData();

  const [ expandedFilter, setExpandedFilter ] = useState<string|null>(null);
  const [ checkedEquipmentTypes, setCheckedEquipmentTypes ] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trySearch = async () => {
      await search('equipment');
      // TO DO: bug:
      // if they're already at /equipment/list then this setter does not work
      console.log(filters?.equipment_types);
      if (filters?.equipment_types) setCheckedEquipmentTypes(filters.equipment_types);
      setLoading(false);
    }
    if (router.isReady) trySearch();
  }, [router.isReady]);

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) {
      setExpandedFilter(null);  // close the dropdown
      // if needed, re-search with updated filters
      if (name === "equipment_types" && checkedEquipmentTypes !== filters?.equipment_types) {
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
    <div className="two-col equipment-list">
      <div className="two-col-left search-results">
        <div style={{fontSize: "2rem", color: "red"}}>{renders.current}</div>

        <h1>Equipment</h1>

        {results.length > 0
          ? (
            <div className="settings">
              <p className="info">
                {total_results} total results and {total_pages} total pages
              </p>

              <ResultsPerPage key={1} />

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
              </div>
            </div>
          )
          : false
        }

        <Pagination key={2} />
        
        <div className="search-results-list">
          {!results
            ? <div>Loading...</div>
            : results.length < 1
              ? <p className="no-results">No results found.</p>
              : results.map(e => (
                <Link
                  className="search-results-list-item"
                  href={`/equipment/detail/${e.equipment_name}`}
                  key={e.equipment_id}
                >
                  <img src={`${url}/${e.image_filename}.jpg`} />
                  <h3>{e.equipment_name}</h3>
                  <div className="type">{e.equipment_type_name}</div>
                </Link>
              ))
          }
        </div>

        <Pagination key={3} />
      </div>

      <div className="two-col-right"></div>
    </div>
  );
}
