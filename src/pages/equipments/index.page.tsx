import { Facet, Paging, PagingInfo, ResultsPerPage, withSearch } from '@elastic/react-search-ui';
import Link from 'next/link';

import { ExpandCollapse } from '../../components';

const url = "https://s3.amazonaws.com/nobsc-images-01/equipment/";

export function Equipments({ facets, filters, results, wasSearched }: PropsFromContext) {
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

type PropsFromContext = {
  facets:      any;
  filters?:    any;
  results:     any;
  wasSearched: boolean;
};

const mapContextToProps = ({ facets, filters, results, wasSearched }: PropsFromContext) => ({facets, filters, results, wasSearched});

export default withSearch(mapContextToProps)(Equipments);

              /*facets={{
                equipment_type_name: [
                  {
                    data: [{count: 1, value: "Cleaning"}, {count: 1, value: "Preparing"}, {count: 1, value: "Cooking"}, {count: 1, value: "Dining"}, {count: 1, value: "Storage"}],
                    field: "equipment_type_name",
                    type: "value"
                  }
                ]
              }}*/