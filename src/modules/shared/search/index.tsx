import axios                            from 'axios';
import type { ChangeEvent }             from 'react';
import { useContext, useState, useRef } from 'react';

import { endpoint }       from '../../../config/api';
import { SearchContext }  from './hook';
import type { SearchIndex, SuggestionView } from './state';
export { Pagination }     from './Pagination';
export { ResultsPerPage } from './ResultsPerPage';

export function Search() {
  const searchDriver = useContext(SearchContext);

  const [ searchIndexChanged, setSearchIndexChanged ] = useState(false);  // useRef?

  const inputRef           = useRef<HTMLInputElement>(null);
  const autosuggestionsRef = useRef<HTMLDivElement>(null);
  const mouseIsOverRef     = useRef<boolean>(false);

  const [ index,       setIndex ]       = useState("recipes");  // index AKA prefilter AKA database table
  const [ term,        setTerm ]        = useState("");
  const [ suggestions, setSuggestions ] = useState<SuggestionView[]>([]);

  const capitalized = index.charAt(0).toUpperCase() + index.slice(1);  // "recipes" --> "Recipes"

  const onSearchIndexChange = (e: ChangeEvent<HTMLSelectElement>) => {
    inputRef.current?.focus();
    setIndex(e.target.value as SearchIndex);
    setSearchIndexChanged(true);
  };

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);
    if (value.length < 3) return;
    if (autosuggestionsRef.current) {
      autosuggestionsRef.current.style.display = "block";
    }
    //await delay(1250);  // debounce
    try {
      const { data } = await axios.get(
        `${endpoint}/search/autosuggest/${index}?term=${term}`
      );
      setSuggestions(data.found);
    } catch (err) {}
  };

  const submitSearch = () => {
    searchDriver.search(searchIndexChanged && searchIndexChanged, term && term);
  };

  const selectSuggestion = (suggestion: string) => {
    setTerm(suggestion);  // just search right away?
    setSuggestions([]);
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
      if (mouseIsOverRef.current === false && autosuggestionsRef.current) {
        autosuggestionsRef.current.style.display = "none";
      }
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
        <input
          ref={inputRef}
          id="search-input"
          onFocus={onInputChange}
          onChange={onInputChange}
          value={term}
        />

        <div className="magnifying-glass" onClick={submitSearch}>
          <span></span>
        </div>

        <div ref={autosuggestionsRef} className="autosuggestions">
          <ul>
            {suggestions.map(suggestion => (
              <li
                key={suggestion.id}
                onClick={() => selectSuggestion(suggestion.text)}
              >{suggestion.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
