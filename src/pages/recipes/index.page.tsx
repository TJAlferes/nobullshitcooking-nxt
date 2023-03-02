import axios                   from 'axios';
import Link                    from 'next/link';
import { useEffect, useState } from 'react';

//import { Facet, Paging, PagingInfo, ResultsPerPage, withSearch } from '../../components';
import { ExpandCollapse } from '../../components';
import {
  setFilters,
  addFilter,
  removeFilter,
  setSorts,
  setCurrentPage,
  setResultsPerPage
} from '../../store/search/actions';
import {
  useTypedDispatch as useDispatch,
  useTypedSelector as useSelector
} from '../../store';
import { endpoint } from '../../utils/api';
import './recipes.css';

const url = "https://s3.amazonaws.com/nobsc-user-recipe/";

export default function Recipes() {
  const dispatch =       useDispatch();

  const recipeTypes =    useSelector(state => state.data.recipeTypes);
  const methods =        useSelector(state => state.data.methods);
  const cuisines =       useSelector(state => state.data.cuisines);

  const term =           useSelector(state => state.search.term);
  const filters =        useSelector(state => state.search.filters);
  const sorts =          useSelector(state => state.search.sorts);
  const currentPage =    useSelector(state => state.search.currentPage);
  const resultsPerPage = useSelector(state => state.search.resultsPerPage);

  const results =        useSelector(state => state.search.results);
  const totalResults =   useSelector(state => state.search.totalResults);
  const startPage =      useSelector(state => state.search.startPage);
  const endPage =        useSelector(state => state.search.endPage);
  const totalPages =     useSelector(state => state.search.totalPages);

  useEffect(() => {
    /*{recipeTypes: ["Drink", "Main"], methods:     [], cuisines:    []}*/
    const t = props.searchParams.filters;  // ?r=Drink&r=Main

    function setFiltersFromURLParams(filterType: string) {
      let data;
      let fn;
      if (filterType === "recipeTypes") {
        data = dataRecipeTypes;
        fn =   setRecipeTypesFilters;
      } else if (filterType === "methods") {
        data = dataMethods;
        fn =   setMethodsFilters;
      } else if (filterType === "cuisines") {
        data = dataCuisines;
        fn =   setCuisinesFilters;
      } else return;

      const values = data.map(d => Object.values(d)[0]);
      const valid =  values.includes(t);
      if (!valid) return;

      const keys = [];
      data.map(d => {
        const [ key, value ] = Object.entries(d)[0];
        if (value === t) keys.push(key);
      });
      for (const key of keys) fn(prevState => ({...prevState, [key]: true}));
    }

    setFiltersFromURLParams("recipeTypes");  // put an if statement in front of each
    setFiltersFromURLParams("methods");
    setFiltersFromURLParams("cuisines");
  }, [props.match.params.type]);

  useEffect(() => {
    getRecipes();
    // fix
    if (props.recipeTypesPreFilter) setRecipeTypesFilters();
    if (props.cuisinesPreFilter)    setCuisinesFilters();
    else getRecipes();
  }, []);

  useEffect(() => {
    getRecipes();  //getRecipesView();
  }, [recipeTypesFilters, cuisinesFilters]);

  const getRecipes = async (startingAt = 0) => {
    const response = await axios.post(`${endpoint}/recipe`, {
      types:    getCheckedRecipeTypesFilters(),
      cuisines: getCheckedCuisinesFilters(),
      start:    startingAt
    });

    setRecipes(response.data.rows);
    setPages(response.data.pages);
    setStarting(response.data.starting);
  }

  const getRecipesView = (startingAt = 0) => dispatch(viewGetRecipes(checkedRTFilters(), checkedCFilters(), display, startingAt));

  const getCheckedRecipeTypesFilters = () => Object.entries(recipeTypesFilters).map(([ key, value ]) => value === true && Number(key));
  const getCheckedMethodsFilters =     () => Object.entries(methodsFilters).map(([ key, value ]) => value === true && Number(key));
  const getCheckedCuisinesFilters =    () => Object.entries(cuisinesFilters).map(([ key, value ]) => value === true && Number(key));

  const handleRecipeTypesFilterChange = (e) => {
    const id = e.target.id;
    setRecipeTypesFilters(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  }

  const handleCuisinesFilterChange = (e) => {
    const id = e.target.id;
    setCuisinesFilters(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  }

  const pageNumbers = (currPage) => {
    const display = 25;
    const numbers = [];
    for (let i = 1; i <= viewPages; i++) {
      const startingAt = viewDisplay * (i - 1);
      if (i !== currPage) numbers.push(<span onClick={() => getRecipes(startingAt)} key={i}>{i}</span>);  // page number
      else                numbers.push(<span key={i}>{i}</span>);                                         // current page number
    }
    return numbers;
  };

  const paginate = () => {
    const display =        25;
    const currPage =       Math.floor((starting / display) + 1);
    const startingAtPrev = (starting == 0) ? starting : (starting - display);
    const startingAtNext = (starting + display);

    return (
      <div>
        <span>
          {currentPage !== 1 &&     <span onClick={() => getRecipes(startingAtPrev)}>Prev</span>}
          {pageNumbers(currPage)}
          {currentPage !== pages && <span onClick={() => getRecipes(startingAtNext)}>Next</span>}
        </span>
      </div>
    );
  }

  return (
    <div className="recipes two-col-b">
      <div className="two-col-b-left">
        <h1>Recipes</h1>

        <div id="filters">
          <span>Filter by:</span>

          <div className="filter-group">
            <label>Recipe Types</label>
            {recipeTypes.map(({ id, name }) => (
              <span key={id}>
                <input
                  type="checkbox"
                  checked={filters.recipeTypes.includes(name)}
                  onChange={() => filters.recipeTypes.includes(name) ? removeFilter("recipeTypes", name) : addFilter("recipeTypes", name)}
                />
                <label>{name}</label>
              </span>
            ))}
          </div>

          <div className="filter-group">
            <label>Methods</label>
            {methods.map(({ id, name }) => <span key={id}><input type="checkbox" onChange={e => handleCuisinesFilterChange(e)} /><label>{name}</label></span>)}
          </div>

          <div className="filter-group">
            <label>Cuisines</label>
            {cuisines.map(({ id, name }) => <span key={id}><input type="checkbox" onChange={e => handleCuisinesFilterChange(e)} /><label>{name}</label></span>)}
          </div>
        </div>

        {(pages > 1) && paginate()}

        <div>
          {recipes.map(({ id, name, image }) => (
            <div key={id}>
              <Link to={`/food/recipe/${id}`}>
                <div>{name}</div>
                <img src={`https://s3.amazonaws.com/nobsc-images-01/recipes/recipe/${image}.jpg`} />
              </Link>
            </div>
          ))}
        </div>

        {(pages > 1) && paginate()}
      </div>

      <div className="two-col-b-right"></div>
    </div>
  );
}

/*export function Recipes({ filters, results }: PropsFromContext) {
  return (
    <div className="search-results two-col-b">
      <div className="two-col-b-left">
        <h1>Recipes</h1>

        <ExpandCollapse headingWhileCollapsed="Filter Results (Click here to expand)">
          <div className="search-results__filters">
            <span className="search-results__filter-title">Filter recipes by:</span>
          </div>
        </ExpandCollapse>

        <ResultsPerPage options={[20, 50, 100]} />
        <PagingInfo />
        <Paging />

        <div className="search-results__list">
          {results ? results.map((r: any) => (
            <div className="recipes" key={r.id}>
              <Link href={`/recipe/${r.id}`} className="recipes-link">
                <div className="text">
                  <div className="title">{r.title}</div>
                  <div className="author">{r.author}</div>
                  <div>
                    <div className="cuisine">{r.cuisine_name}</div>
                    <div className="type">{r.recipe_type_name}</div>
                  </div>
                  <div className="tags">
                    <div className="methods">{r.method_names.map((m: any) => <span className="method" key={m}>{m}</span>)}</div>
                    <div className="ingredients">{r.ingredient_names.map((i: any) => <span className="ingredient" key={i}>{i}</span>)}</div>
                  </div>
                </div>
                {r.recipe_image !== "nobsc-recipe-default"
                  ? <img className="recipes-image" src={`${url}${r.recipe_image}-thumb`} />
                  : <div className="image-default-100-62"></div>
                }
              </Link>
            </div>
          )) : <div>Loading...</div>}
        </div>

        <PagingInfo />
        <Paging />
      </div>

      <div className="two-col-b-right"></div>
    </div>
  );
}

type PropsFromContext = {
  filters?:    any;
  results:     any;
}

const mapContextToProps = ({ filters, results }: PropsFromContext) => ({filters, results});

export default withSearch(mapContextToProps)(Recipes);*/
