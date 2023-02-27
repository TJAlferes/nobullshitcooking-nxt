import type { ChangeEvent, SyntheticEvent } from 'react';
import { useRef }                           from 'react';
import { useRouter }                        from 'next/router';

// TO DO: move
function debounce(cb: Function, delay = 1250) {
  let timeout: any;

  return (...args: any) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  }
}

import { useTypedDispatch as useDispatch, useTypedSelector as useSelector } from '../../../store';
import type { SearchIndex } from '../../../store/search/types';
import { getSuggestions, setIndex, setTerm } from '../../../store/search/actions';

export function Search(): JSX.Element {
  const router =      useRouter();
  const inputRef =    useRef<HTMLInputElement>();
  const dispatch =    useDispatch();
  const index =       useSelector(state => state.search.index);
  const term =        useSelector(state => state.search.term);
  const suggestions = useSelector(state => state.search.suggestions);

  const onSearchIndexChange = (e: ChangeEvent<HTMLSelectElement>) => {
    inputRef.current = document.getElementById("search-input") as HTMLInputElement;
    inputRef.current.focus();
    dispatch(setIndex(e.target.value as SearchIndex));
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {  // IMPORTANT: sequence and debounce
    const value = e.target.value;
    dispatch(setTerm(value));
    if (value.length > 2) debounce(dispatch(getSuggestions(value)));
  }

  const selectSuggestion = (suggestion: string) => {
    dispatch(setTerm(suggestion));
    router.push(`/${index}`);
  };

  const submit = () => {
    redirectToSearchPage();
  };

  const redirectToSearchPage = () => router.push(`/${index}`);

  let facadeText = index.charAt(0).toUpperCase() + index.slice(1);
  if (facadeText === "Equipments") facadeText = "Equipment";

  let field: string | undefined;
  if (index === "recipes")     field = "title";
  if (index === "ingredients") field = "fullname";
  if (index === "equipments")  field = "name";
  if (index === "products")    field = "fullname";

  return (
    <div className="search">
      <div className="category">
        <div className="facade"><span>{facadeText}</span><img src="/images/header/down-arrow-gray.png" width="8" height="6" /></div>
        
        <select className="filters" onChange={onSearchIndexChange}>
          <option value="recipes">Recipes</option>
          <option value="ingredients">Ingredients</option>
          <option value="equipments">Equipment</option>
          <option value="products">Products</option>
        </select>
      </div>

      <div className="insert">
        <input id="search-input" onChange={onInputChange} value={term} />
        <div className="magnifying-glass" onClick={submit}><span></span></div>
      </div>

      {suggestions.length < 1 ? false : (
        <div className='suggestions'>
          {/* <select><option> instead of <ul><li> ? */}
          <ul>
            {suggestions.map(suggestion => <li onClick={() => selectSuggestion(suggestion)}>{suggestion}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
