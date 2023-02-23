import axios                        from 'axios';
import { Facet, Paging, PagingInfo, ResultsPerPage, withSearch } from '@elastic/react-search-ui';
import Link                         from 'next/link';
import { useEffect, useState }      from 'react';

import { ExpandCollapse } from '../../components';
import { useTypedDispatch as useDispatch, useTypedSelector as useSelector } from '../../store';

const url = "https://s3.amazonaws.com/nobsc-user-recipe/";

import { NOBSCAPI as endpoint } from '../../../../config/NOBSCAPI';
import './recipes.css';

export default function Recipes(props) {
  const dispatch =        useDispatch();
  const viewDisplay =     useSelector(state => state.data.viewMainRecipesDisplay);
  const viewPages =       useSelector(state => state.data.viewMainRecipesPages);
  const viewStarting =    useSelector(state => state.data.viewMainRecipesStarting);
  const viewRecipes =     useSelector(state => state.data.viewMainRecipes);
  const dataRecipes =     useSelector(state => state.data.recipes);
  const dataRecipeTypes = useSelector(state => state.data.recipeTypes);
  const dataMethods =     useSelector(state => state.data.methods);
  const dataCuisines =    useSelector(state => state.data.cuisines);

  const [ pages, setPages ] =       useState(1);
  const [ starting, setStarting ] = useState(0);

  const [ recipeTypesFilters, setRecipeTypesFilters ] = useState({
    1: false, 2: false, 3: false,  4: false,  5: false,  6: false,
    7: false, 8: false, 9: false, 10: false, 11: false, 12: false
  });
  const [ methodsFilters, setMethodsFilters ] = useState({
     1: false,  2: false,  3: false,  4: false,  5: false,  6: false,
     7: false,  8: false,  9: false, 10: false, 11: false, 12: false,
    13: false, 14: false, 15: false, 16: false, 17: false, 18: false,
    19: false, 20: false, 21: false, 22: false, 23: false, 24: false
  });
  const [ cuisinesFilters, setCuisinesFilters ] = useState({
    1: false, 2: false, 3: false,  4: false,  5: false,  6: false,
    7: false, 8: false, 9: false, 10: false, 11: false, 12: false
  });

  useEffect(() => {
    /*
    {
      recipeTypes: ["Drink", "Main"],
      methods:     [],
      cuisines:    []
    }
    */
    const t = props.searchParams.filters;  // ?recipeTypes=Drink&recipeTypes=Main

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

  const handleRecipeTypesFilterChange = async (e) => {
    const id = e.target.id;
    await setRecipeTypesFilters(prevState => ({
      ...prevState,
      [id]: !prevState[[id]]
    }));
  }

  const handleCuisinesFilterChange = async (e) => {
    const id = e.target.id;
    await setCuisinesFilters(prevState => ({
      ...prevState,
      [id]: !prevState[[id]]
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

  return(
    <div className="recipes two-col-b">
      <div className="two-col-b-left">
        <h1>Recipes</h1>

        <div id="filters">
          <span>Filter by:</span>

          <form id="rtid" name="rtid" onChange={e => handleRecipeTypesFilterChange(e)}>
            <div>
              <p>Recipe type</p>
              {dataRecipeTypes.map(({ id, name }) => (
                <span key={id}><input type="checkbox" id={id} /><label>{name}</label></span>
              ))}
            </div>
          </form>

          <form id="cid" name="cid" onChange={e => handleCuisinesFilterChange(e)}>
            <div>
              <p>Cuisine</p>
              {dataCuisines.map(({ id, name }) => (
                <span key={id}><input type="checkbox" id={id}/><label>{name}</label></span>
              ))}
            </div>
          </form>
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

export function Recipes({ facets, filters, results, wasSearched }: PropsFromContext) {
  return (
    <div className="search-results two-col-b">
      <div className="two-col-b-left">
        <h1>Recipes</h1>

        <ExpandCollapse headingWhileCollapsed="Filter Results (Click here to expand)">
          <div className="search-results__filters">
            <span className="search-results__filter-title">Filter recipes by:</span>
            <Facet field="recipe_type_name" filterType="any" label="Recipe Types" show={12} />
            <Facet field="cuisine_name"     filterType="any" label="Cuisines"     show={24} />
            <Facet field="method_names"     filterType="any" label="Methods"      show={24} />
          </div>
        </ExpandCollapse>

        {wasSearched && <ResultsPerPage options={[20, 50, 100]} />}
        {wasSearched && <PagingInfo />}
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

export default withSearch(mapContextToProps)(Recipes);

              /*facets={{
                recipe_type_name: [
                  {
                    data: [
                      {count: 1, value: "Drink"},
                      {count: 1, value: "Appetizer"},
                      {count: 1, value: "Main"},
                      {count: 1, value: "Side"},
                      {count: 1, value: "Dessert"},
                      {count: 1, value: "Soup"},
                      {count: 1, value: "Salad"},
                      {count: 1, value: "Stew"},
                      {count: 1, value: "Casserole"},
                      {count: 1, value: "Sauce"},
                      {count: 1, value: "Dressing"},
                      {count: 1, value: "Condiment"}
                    ],
                    field: "recipe_type_name",
                    type: "value"
                  }
                ]
              }}*/

              /*facets={{
                cuisine_name: [
                  {
                    data: [
                      {count: 1, value: "Russian"},
                      {count: 1, value: "German"},
                      {count: 1, value: "Turkish"},
                      {count: 1, value: "French"},
                      {count: 1, value: "Italian"},
                      {count: 1, value: "Mexican"},
                      {count: 1, value: "Greek"},
                      {count: 1, value: "Irish"},
                      {count: 1, value: "Chinese"},
                      {count: 1, value: "Indian"},
                      {count: 1, value: "Japanese"},
                      {count: 1, value: "Iranian"},
                      {count: 1, value: "Spanish"},
                      {count: 1, value: "Thai"},
                      {count: 1, value: "Vietnamese"},
                      {count: 1, value: "Korean"},
                      {count: 1, value: "Swedish"},
                      {count: 1, value: "Norwegian"},
                      {count: 1, value: "Polish"},
                      {count: 1, value: "Hungarian"},
                      {count: 1, value: "Brazilian"},
                      {count: 1, value: "Argentinian"},
                      {count: 1, value: "Nigerian"},
                      {count: 1, value: "Other"}
                    ],
                    field: "cuisine_name",
                    type: "value"
                  },
                ]
              }}*/

              /*facets={{
                method_names: [
                  {
                    data: [
                      {count: 1, value: "No-Cook"},
                      {count: 1, value: "Chill"},
                      {count: 1, value: "Freeze"},
                      {count: 1, value: "Microwave"},
                      {count: 1, value: "Toast"},
                      {count: 1, value: "Steam"},
                      {count: 1, value: "Poach"},
                      {count: 1, value: "Simmer"},
                      {count: 1, value: "Boil"},
                      {count: 1, value: "Blanch"},
                      {count: 1, value: "Stew"},
                      {count: 1, value: "Braise"},
                      {count: 1, value: "Bake"},
                      {count: 1, value: "Roast"},
                      {count: 1, value: "Broil"},
                      {count: 1, value: "Saute"},
                      {count: 1, value: "Pan-Fry"},
                      {count: 1, value: "Shallow-Fry"},
                      {count: 1, value: "Deep-Fry"},
                      {count: 1, value: "Stir-Fry"},
                      {count: 1, value: "Glaze"},
                      {count: 1, value: "BBQ"},
                      {count: 1, value: "Grill"},
                      {count: 1, value: "Smoke"}
                    ],
                    field: "method_names",
                    type: "value"
                  },
                ]
              }}*/
