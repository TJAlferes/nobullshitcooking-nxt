import { useRouter }        from 'next/router';
import type { ChangeEvent } from 'react';
import { useRef }           from 'react';

import { useTypedDispatch as useDispatch, useTypedSelector as useSelector } from '../../store';
import { getSuggestions, setIndex, setTerm }                                from '../../store/search/actions';
import type { SearchIndex }                                                 from '../../store/search/types';

export function Search() {
  const router =      useRouter();
  const inputRef =    useRef<HTMLInputElement>();
  const dispatch =    useDispatch();
  const index =       useSelector(state => state.search.index);
  const term =        useSelector(state => state.search.term);
  const suggestions = useSelector(state => state.search.suggestions);

  const capitalized = index.charAt(0).toUpperCase() + index.slice(1);  // "recipes" --> "Recipes"

  const onSearchIndexChange = (e: ChangeEvent<HTMLSelectElement>) => {
    inputRef.current = document.getElementById("search-input") as HTMLInputElement;
    inputRef.current.focus();
    dispatch(setIndex(e.target.value as SearchIndex));
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {  // IMPORTANT: sequence and debounce
    const value = e.target.value;
    dispatch(setTerm(value));
    if (value.length > 2) debounce(() => dispatch(getSuggestions()));
  }

  const selectSuggestion = (suggestion: string) => {
    dispatch(setTerm(suggestion));
    goToSearchResults();
  };

  const goToSearchResults = () => router.push(`/${index}${index === "equipment" && "s"}`);

  return (
    <div className="search">
      <div className="category">
        <div className="facade">
          <span>{capitalized}</span>
          <img src="/images/header/down-arrow-gray.png" width="8" height="6" />
        </div>
        
        <select onChange={onSearchIndexChange}>
          <option value="recipes">Recipes</option>
          <option value="ingredients">Ingredients</option>
          <option value="equipments">Equipment</option>
          <option value="products">Products</option>
        </select>
      </div>

      <div className="insert">
        <input id="search-input" onChange={onInputChange} value={term} />
        <div className="magnifying-glass" onClick={goToSearchResults}>
          <span></span>
        </div>
      </div>

      {suggestions.length >= 1 && (
        <div className="autosuggestions">
          {/* <select><option> instead of <ul><li> ? */}
          <ul>
            {suggestions.map(suggestion => (
              <li onClick={() => selectSuggestion(suggestion)}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

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
