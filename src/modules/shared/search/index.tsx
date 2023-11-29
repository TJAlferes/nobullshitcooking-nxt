import axios from 'axios';
import { useRouter } from 'next/navigation';
import qs from 'qs';
import type { ChangeEvent } from 'react';
import { useState, useRef } from 'react';

import { endpoint } from '../../../config/api';
import { debounce } from '../../general/debounce';
import { useSearch } from './hook';
import type { SearchIndex, SuggestionView } from './types';

export { Pagination } from './Pagination';
export { ResultsPerPage } from './ResultsPerPage';

export function Search() {
  const router = useRouter();

  const { params, search } = useSearch();

  const [searchIndexChanged, setSearchIndexChanged] = useState(false);  // useRef???

  const inputRef = useRef<HTMLInputElement>(null);
  const autosuggestionsRef = useRef<HTMLDivElement>(null);
  const mouseIsOverRef = useRef<boolean>(false);

  const [index, setIndex] = useState<SearchIndex>('recipe');  // AKA prefilter AKA database table
  const [term, setTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestionView[]>([]);

  const capitalized = index.charAt(0).toUpperCase() + index.slice(1) + 's';  // 'recipe' --> 'Recipe'

  const onSearchIndexChange = (e: ChangeEvent<HTMLSelectElement>) => {
    inputRef.current?.focus();
    setIndex(e.target.value as SearchIndex);
    
    setSearchIndexChanged(true);
  };

  // TO DO: RequestSequencer

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    //setTerm(value);
    params.index = index;
    params.term = value;
    const search_params = qs.stringify(params);
    router.push(`/${index}/list/?${search_params}`);
    if (value.length < 3) return;
    if (autosuggestionsRef.current) {
      autosuggestionsRef.current.style.display = 'block';
    }
    debounce(async () => {
      try {
        const res = await axios.get(
          `${endpoint}/search/auto/${params.index}?term=${params.term}`
        );
        setSuggestions(res.data);
      } catch (err) {}
    }, 1250);
  };

  const submitSearch = () => search(searchIndexChanged, term);

  const selectSuggestion = (suggestion: string) => {
    setTerm(suggestion);  // just search right away?
    setSuggestions([]);
  };

  const initSearchInputBlurHandler = () => {
    if (typeof window === 'undefined') return;
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
        autosuggestionsRef.current.style.display = 'none';
      }
    };
  };
  
  initSearchInputBlurHandler();  // put into a useEffect? and is a manual teardown needed?

  return (
    <div className='search'>
      <div className='category'>
        <div className='facade'>
          <span>{capitalized}</span>
          <img src='/images/header/down-arrow.png' width='8' height='6' />
        </div>
        
        <select onChange={onSearchIndexChange}>
          <option value='recipes'>Recipes</option>
          <option value='ingredients'>Ingredients</option>
          <option value='equipment'>Equipment</option>
          <option value='products'>Products</option>
        </select>
      </div>

      <div className='insert'>
        <input
          ref={inputRef}
          id='search-input'
          onFocus={onInputChange}
          onChange={onInputChange}
          value={term}
        />

        <div className='magnifying-glass' onClick={submitSearch}>
          <span></span>
        </div>

        <div ref={autosuggestionsRef} className='autosuggestions'>
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
