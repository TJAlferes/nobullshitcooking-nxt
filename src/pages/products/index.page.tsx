import { Facet, Paging, PagingInfo, ResultsPerPage, withSearch } from '@elastic/react-search-ui';
import Link from 'next/link';

import { ExpandCollapse } from '../../components';

const url = "https://s3.amazonaws.com/images-01/products/";

export function Products({ facets, filters, results, wasSearched }: PropsFromContext) {
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

type PropsFromContext = {
  facets:      any;
  filters?:    any;
  results:     any;
  wasSearched: boolean;
}

const mapContextToProps = ({ facets, filters, results, wasSearched }: PropsFromContext) => ({facets, filters, results, wasSearched});

export default withSearch(mapContextToProps)(Products);