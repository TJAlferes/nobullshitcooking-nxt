import { Facet, Paging, PagingInfo, ResultsPerPage, withSearch } from '@elastic/react-search-ui';
import Link from 'next/link';

import { useTypedSelector as useSelector } from '../../store';

const url = "https://s3.amazonaws.com/images-01/products/";

function listResults(results: any) {
  if (results && results[0] && results[0].id) {
    return results.map((p: any) => (
      <div className="products" key={p.id.raw}>
        <Link href={`/product/${p.id.raw}`} className="products__link">
          <div className="products__text">
            <div className="products__fullname">{p.fullname.raw}</div>
            <div className="products__type">{p.product_type_name.raw}</div>
          </div>
            
          {(p.image.raw !== "nobsc-product-default")
            ? <img className="products__image" src={`${url}${p.image.raw}-thumb`} />
            : <div className="image-default-100-62"></div>
          }
        </Link>
      </div>
    ));
  }
  else return <div>Loading...</div>;
}

export function Products({ results, wasSearched }: PropsFromContext) {  // facets, filters
  const theme = useSelector(state => state.theme.theme);

  return (
    <div className={`search-results two-column-b ${theme}`}>
      <div className="left-column">
        <h1>Products</h1>
        
        {wasSearched && <ResultsPerPage options={[20, 50, 100]} />}
        {wasSearched && <PagingInfo />}
        <Paging />

        <div className="search-results__list">{listResults(results)}</div>

        {wasSearched && <PagingInfo />}
        <Paging />
      </div>

      <div className="right-column"></div>
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