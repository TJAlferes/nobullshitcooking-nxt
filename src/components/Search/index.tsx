'use client';

import type { ChangeEvent }             from 'react';
import { useContext, useState, useRef } from 'react';

import { useTypedDispatch as useDispatch, useTypedSelector as useSelector } from '../../store';
import { getSuggestions, setSuggestions, setIndex, setTerm }                from '../../store/search/actions';
import type { SearchIndex }                                                 from '../../store/search/types';
import { SearchContext }                                                    from '../../utils/SearchProvider';

export function Search() {
  const searchDriver = useContext(SearchContext);

  const [ searchIndexChanged, setSearchIndexChanged ] = useState(false);  // useRef?

  const inputRef =           useRef<HTMLInputElement>(null);
  const autosuggestionsRef = useRef<HTMLDivElement>(null);
  const mouseIsOverRef =     useRef<boolean>(false);

  const dispatch =    useDispatch();
  const index =       useSelector(state => state.search.index);
  const term =        useSelector(state => state.search.term);
  const suggestions = useSelector(state => state.search.suggestions);

  let capitalized = index.charAt(0).toUpperCase() + index.slice(1);  // "recipes" --> "Recipes"

  const onSearchIndexChange = (e: ChangeEvent<HTMLSelectElement>) => {
    inputRef.current?.focus();
    dispatch(setIndex(e.target.value as SearchIndex));
    setSearchIndexChanged(true);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setTerm(value));
    if (value.length > 2) {
      if (autosuggestionsRef.current) autosuggestionsRef.current.style.display = "block";
      dispatch(getSuggestions(value));
    }
  };

  const submitSearch = () => {
    searchDriver.search(searchIndexChanged && searchIndexChanged, term && term);
  };

  const selectSuggestion = (suggestion: string) => {
    dispatch(setTerm(suggestion));
    dispatch(setSuggestions([]));
  };

  const initSearchInputBlurHandler = () => {
    if (typeof window === 'undefined')   return;
    if (typeof document === 'undefined') return;
    mouseIsOverRef.current = false;
    if (!autosuggestionsRef.current) return;
    if (!inputRef.current) return;
    autosuggestionsRef.current.onmouseover = function() {
      mouseIsOverRef.current = true;
    };
    autosuggestionsRef.current.onmouseout = function() {
      mouseIsOverRef.current = false;
    };
    inputRef.current.onblur = function() {
      if (mouseIsOverRef.current === false && autosuggestionsRef.current) autosuggestionsRef.current.style.display = "none";
    };
  };
  
  initSearchInputBlurHandler();  // put into a useEffect? and is a manual teardown needed?

  return (
    <div className="search">
      <div className="category">
        <div className="facade">
          <span>{capitalized}</span>
          <img src="/images/header/down-arrow.png" width="8" height="6" />
        </div>
        
        <select onChange={onSearchIndexChange}>
          <option value="recipes">Recipes</option>
          <option value="ingredients">Ingredients</option>
          <option value="equipment">Equipment</option>
          <option value="products">Products</option>
        </select>
      </div>

      <div className="insert">
        <input ref={inputRef} id="search-input" onFocus={onInputChange} onChange={onInputChange} value={term} />

        <div className="magnifying-glass" onClick={submitSearch}>
          <span></span>
        </div>

        <div ref={autosuggestionsRef} className="autosuggestions">
          <ul>
            {suggestions.map(suggestion => (
              <li key={suggestion.id} onClick={() => selectSuggestion(suggestion.text)}>{suggestion.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
