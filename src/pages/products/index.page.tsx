'use client';

import Link                     from 'next/link';
import { useContext, useState } from 'react';

import { ExpandCollapse, Pagination, ResultsPerPage } from '../../components';
import { useTypedSelector as useSelector }            from '../../store';
import { SearchContext }                              from '../../utils/SearchProvider';

//const url = "https://s3.amazonaws.com/images-01/products/";

export default function Products() {
  const searchDriver = useContext(SearchContext);

  const currProductCategories = searchDriver.params.filters?.productCategories;
  const currProductTypes =      searchDriver.params.filters?.productTypes;

  const productCategories = useSelector(state => state.data.productCategories);
  const productTypes =      useSelector(state => state.data.productTypes);
  
  //const resultTerm        useSelector(state = state.search.resultTerm);
  const results =          useSelector(state => state.search.results);
  const totalResults =     useSelector(state => state.search.totalResults);
  const totalPages =       useSelector(state => state.search.totalPages);

  const [ expandedFilter,        setExpandedFilter ] =        useState<string|null>(null);
  const [ nextProductCategories, setNextProductCategories ] = useState<string[]>(currProductCategories ?? []);
  const [ nextProductTypes,      setNextProductTypes ] =      useState<string[]>(currProductTypes ?? []);

  const toggleFilterDropdown = (name: string) => {
    if (expandedFilter === name) {
      setExpandedFilter(null);
      if (name === "productCategories" && currProductCategories !== nextProductCategories) searchDriver.setFilters(name, nextProductCategories);
      if (name === "productTypes"      && currProductTypes !== nextProductTypes)           searchDriver.setFilters(name, nextProductTypes);
    } else {
      setExpandedFilter(name);
    }
  };

  return (
    <div className="two-col">
      <div className="two-col-left search-results">
        <h1>Products</h1>
        <p>{totalResults} total results and {totalPages} total pages</p>

        <div className="filters">
          <span className="filter-by">Filter by:</span>

          <ExpandCollapse
            headingWhileCollapsed={(
              <div className={`filter-name${expandedFilter === "productCategories" ? " active" : ""}`}>
                <span>Product Categories</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            headingWhileExpanded={(
              <div className={`filter-name${expandedFilter === "productCategories" ? " active" : ""}`}>
                <span>Product Categories</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            isDisabled={expandedFilter !== "productCategories" && expandedFilter !== null}
            handler={() => toggleFilterDropdown("productCategories")}
          >
            <div className="filter-group">
              {productCategories.map(({ id, name }) => (
                <span key={id}>
                  <input
                    type="checkbox"
                    defaultChecked={currProductCategories?.includes(name)}
                    checked={nextProductCategories.includes(name)}
                    onChange={() => {
                      setNextProductCategories(nextProductCategories?.includes(name) ? nextProductCategories.filter(v => v !== name) : [...nextProductCategories, name]);
                    }}
                  />
                  <label>{name}</label>
                </span>
              ))}
            </div>
          </ExpandCollapse>

          <ExpandCollapse
            headingWhileCollapsed={(
              <div className={`filter-name${expandedFilter === "productTypes" ? " active" : ""}`}>
                <span>Product Types</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            headingWhileExpanded={(
              <div className={`filter-name${expandedFilter === "productTypes" ? " active" : ""}`}>
                <span>Product Types</span>
                <img src="/images/header/down-arrow.png" width="8" height="6" />
              </div>
            )}
            isDisabled={expandedFilter !== "productTypes" && expandedFilter !== null}
            handler={() => toggleFilterDropdown("productTypes")}
          >
            <div className="filter-group">
              {productTypes.map(({ id, name }) => (
                <span key={id}>
                  <input
                    type="checkbox"
                    defaultChecked={currProductTypes?.includes(name)}
                    checked={nextProductTypes.includes(name)}
                    onChange={() => {
                      setNextProductTypes(nextProductTypes?.includes(name) ? nextProductTypes.filter(v => v !== name) : [...nextProductTypes, name]);
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

        <div className="search-results__list">
          {results ? results.map(p => (
            <div className="products" key={p.id}>
              <Link href={`/product/${p.id}`}>
                <div className="text">
                  <div className="fullname">{p.fullname}</div>

                  <div className="type">{p.product_type_name}</div>
                </div>

                {/*
                  p.image !== "nobsc-product-default"
                  ? <img className="products-image" src={`${url}${p.image}-thumb`} />
                  : <div className="image-default-100-62"></div>
                */}
              </Link>
            </div>
          )) : <div>Loading...</div>}
        </div>

        <div className="search-results-list">
          {
            results
              ? results.map(p => (
                <Link className="search-results-list-item" href={`/product?fullname=${p.fullname}`} key={p.id}>
                  <img src="/images/dev/knife-280-172.jpg" />
                  <h3>{p.fullname}</h3>
                  <div className="type">{p.product_category_name}</div>
                  <div className="type">{p.product_type_name}</div>
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
