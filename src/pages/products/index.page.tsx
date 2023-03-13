'use client';

import Link from 'next/link';

import { ExpandCollapse, Pagination, ResultsPerPage } from '../../components';
import { useTypedSelector as useSelector }            from '../../store';
import { useSearch }                                  from '../../utils/useSearch';

const url = "https://s3.amazonaws.com/images-01/products/";

export default function Products() {
  const { params, addFilter, removeFilter } = useSearch();

  const currProductCategories = params.filters?.productCategories;
  const currProductTypes =      params.filters?.productTypes;

  const productCategories = useSelector(state => state.data.productCategories);
  const productTypes =      useSelector(state => state.data.productTypes);
  const term =              useSelector(state => state.search.term);
  //const filters =          useSelector(state => state.search.filters);  // not even needed? it is, because they may want to leave the page and come back to their same filters
  //const sorts =            useSelector(state => state.search.sorts);  // not even needed?
  const results =          useSelector(state => state.search.results);
  const totalResults =     useSelector(state => state.search.totalResults);
  const totalPages =       useSelector(state => state.search.totalPages);

  return (
    <div className="search-results two-col-b">
      <div className="two-col-b-left">
        <h1>Products</h1>

        <div id="filters">
          <span>Filter by:</span>

          <ExpandCollapse headingWhileCollapsed="Product Categories">
            <div className="filter-group">
              <p>Product Categories</p>
              {productCategories.map(({ id, name }) => (
                <span key={id}>
                  <input
                    type="checkbox"
                    checked={currProductCategories?.includes(name) ? true : false}
                    onChange={() => currProductCategories?.includes(name) ? removeFilter("productCategories", name) : addFilter("productCategories", name)}
                    />
                    <label>{name}</label>
                </span>
              ))}
            </div>
          </ExpandCollapse>

          <ExpandCollapse headingWhileCollapsed="Product Types">
            <div className="filter-group">
              <p>Product Types</p>
              {productTypes.map(({ id, name }) => (
                <span key={id}>
                  <input
                    type="checkbox"
                    checked={currProductTypes?.includes(name) ? true : false}
                    onChange={() => currProductTypes?.includes(name) ? removeFilter("productTypes", name) : addFilter("productTypes", name)}
                    />
                    <label>{name}</label>
                </span>
              ))}
            </div>
          </ExpandCollapse>
        </div>

        <Pagination />
        <ResultsPerPage />

        <div className="search-results__list">
          {results ? results.map(p => (
            <div className="products" key={p.id}>
              <Link href={`/product/${p.id}`}>
                <div className="text">
                  <div className="fullname">{p.fullname}</div>
                  <div className="type">{p.product_type_name}</div>
                </div>
                {p.image !== "nobsc-product-default"
                  ? <img className="products-image" src={`${url}${p.image}-thumb`} />
                  : <div className="image-default-100-62"></div>
                }
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
