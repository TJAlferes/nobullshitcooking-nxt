import axios from 'axios';
import type { CancelTokenSource } from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

import { endpoint } from '../../../config/api';
import { useDebouncedValue } from '../../general/useDebouncedValue';
import { useSearch } from './hook';
import type { SearchRequest, SearchIndex, SuggestionView } from './types';

export { Pagination } from './Pagination';
export { ResultsPerPage } from './ResultsPerPage';

export function Search() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = qs.parse(searchParams.toString()) as SearchRequest;

  const { search_index, setSearchIndex, /*search_term, setSearchTerm,*/ search } = useSearch();
  const debounced_search_term = useDebouncedValue(params.term || '');  // move???

  const [searchIndexChanged, setSearchIndexChanged] = useState(false);  // useRef???
  const [suggestions, setSuggestions] = useState<SuggestionView[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const autosuggestionsRef = useRef<HTMLDivElement>(null);
  const mouseIsOverRef = useRef<boolean>(false);
  
  const capitalized = search_index.charAt(0).toUpperCase() + search_index.slice(1);

  const onSearchIndexChange = (e: ChangeEvent<HTMLSelectElement>) => {
    inputRef.current?.focus();
    setSearchIndex(e.target.value as SearchIndex);
    setSearchIndexChanged(true);
  };

  let cancelToken: CancelTokenSource | undefined;
  // TO DO: Cancel Token is deprecated, upgrade to Signal
  // See: https://axios-http.com/docs/cancellation

  const getSuggestions = async (value: string, cancelToken: CancelTokenSource | undefined) => {
    if (cancelToken !== undefined) {  // Check for any prev pending reqs
      cancelToken.cancel("Operation canceled due to new request.");
    }
    cancelToken = axios.CancelToken.source();  // Save the cancel token for the curr req
    try {
      const res = await axios.get(
        `${endpoint}/search/auto/${search_index}?term=${encodeURIComponent(value)}`,
        {cancelToken: cancelToken.token}
      );
      if (res.status === 200) setSuggestions(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    if (debounced_search_term.length < 3) return;
    if (autosuggestionsRef.current) {
      autosuggestionsRef.current.style.display = 'block';
    }
    getSuggestions(debounced_search_term, cancelToken);
    // clean up function needed here???
  }, [debounced_search_term]);

  const inputChangeHandler = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) params.set('term', term);
    else params.delete('term');
    router.replace(`${pathname}?${params.toString()}`);
  };

  const submitSearch = () => search(searchIndexChanged);

  const selectSuggestion = (suggestion: string) => {
    //setSearchTerm(suggestion);  // just search right away?
    const params = new URLSearchParams(searchParams);
    params.set('term', suggestion);
    router.replace(`${pathname}?${params.toString()}`);
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
        </select>
      </div>

      <div className='insert'>
        {/*
          Warning: A component is changing an uncontrolled input to be controlled.
          This is likely caused by the value changing from undefined to a defined value,
          which should not happen.
          Decide between using a controlled or uncontrolled input element
          for the lifetime of the component.
        */}
        <input
          ref={inputRef}
          id='search-input'
          /*onFocus={e => setSearchTerm(e.target.value)}*/
          onChange={e => inputChangeHandler(e.target.value)}
          /*value={params.term}*/
          defaultValue={params.term}
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
