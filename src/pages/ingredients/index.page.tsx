'use client';

import Link from 'next/link';
import { useRef } from 'react';  // FOR DEBUGGING

import { ExpandCollapse, Pagination, ResultsPerPage } from '../../components';
import { useTypedSelector as useSelector }            from '../../store';
import { useSearch }                                  from '../../utils/useSearch';

const url = "https://s3.amazonaws.com/nobsc-images-01/ingredients/";

export default function Ingredients() {
  const renderCounter = useRef(0);                    // FOR DEBUGGING
  renderCounter.current = renderCounter.current + 1;  // FOR DEBUGGING

  const { params, addFilter, removeFilter } = useSearch();

  const currIngredientTypes = params.filters?.ingredientTypes;

  const ingredientTypes = useSelector(state => state.data.ingredientTypes);
  const term =            useSelector(state => state.search.term);
  //const filters =         useSelector(state => state.search.filters);  // not even needed? it is, because they may want to leave the page and come back to their same filters
  //const sorts =           useSelector(state => state.search.sorts);  // not even needed?
  const results =         useSelector(state => state.search.results);
  const totalResults =    useSelector(state => state.search.totalResults);
  const totalPages =      useSelector(state => state.search.totalPages);

  return (
    <div className="search-results two-col-b">
      <div className="two-col-b-left">
        <h1>Ingredients</h1>
        <h1>{renderCounter.current}</h1>{/* FOR DEBUGGING */}

        <div id="filters">
          <span>Filter by:</span>

          <ExpandCollapse headingWhileCollapsed="Ingredient Types">
            <div className="filter-group">
              <p>Ingredient Types</p>
              {ingredientTypes.map(({ id, name }) => (
                <span key={id}>
                  <input
                    type="checkbox"
                    checked={currIngredientTypes?.includes(name) ? true : false}
                    onChange={() => currIngredientTypes?.includes(name) ? removeFilter("ingredientTypes", name) : addFilter("ingredientTypes", name)}
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
          {results ? results.map(i => (
            <div className="ingredients" key={i.id}>
              <Link href={`/ingredient/${i.id}`}>
                <div className="text">
                  <div className="fullname">{i.fullname}</div>
                  <div className="type">{i.ingredient_type_name}</div>
                </div>
                {/*<img src={`${url}${i.image}.jpg`} />*/}
              </Link>
            </div>
          )) : <div>Loading...</div>}
        </div>

        <Pagination />
        <ResultsPerPage />
      </div>

      <div className="two-col-b-right">
      </div>
    </div>
  );
}
