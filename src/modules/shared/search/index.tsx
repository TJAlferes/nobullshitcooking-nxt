import axios from 'axios';
import type { CancelTokenSource } from 'axios';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

import { endpoint } from '../../../config/api';
import { useDebouncedValue } from '../../general/useDebouncedValue';
import { useSearch } from './hook';
import type { SearchIndex, SuggestionView } from './types';
import { LoaderSpinner } from '../LoaderSpinner';

export { Pagination } from './Pagination';
export { ResultsPerPage } from './ResultsPerPage';

export function Search() {
  const pathname = usePathname();
  const router = useRouter();

  const { params, search } = useSearch();
  const debounced_search_term = useDebouncedValue(params.term || '');  // move???

  const [searchIndexChanged, setSearchIndexChanged] = useState(false);  // useRef???
  const [index, setIndex] = useState<SearchIndex>();
  const [term, setTerm] = useState(params.term ?? '');
  const [suggestions, setSuggestions] = useState<SuggestionView[]>([]);

  const mouseIsOverRef = useRef<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autosuggestionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIndex(params.index ?? 'recipes');
  }, [params.index]);

  const onSearchIndexChange = (e: ChangeEvent<HTMLSelectElement>) => {
    inputRef.current?.focus();
    //setIndex(e.target.value as SearchIndex);
    params.index = e.target.value as SearchIndex;
    router.replace(`${pathname}?${qs.stringify(params)}`);
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
        `${endpoint}/search/auto/?index=${index}&term=${encodeURIComponent(value)}`,
        {cancelToken: cancelToken.token}
      );
      if (res.status === 200) setSuggestions(res.data);
    } catch (err) {
      //
    }
  };

  useEffect(() => {
    if (debounced_search_term.length < 3) return;
    if (autosuggestionsRef.current) {
      autosuggestionsRef.current.style.display = 'block';
    }
    getSuggestions(debounced_search_term, cancelToken);
  }, [debounced_search_term]);

  const inputChangeHandler = (value: string) => {
    setTerm(value);
    if (value) params.term = value;
    else delete params.term;
    router.replace(`${pathname}?${qs.stringify(params)}`);
  };

  const selectSuggestion = (suggestion: string) => {
    inputChangeHandler(suggestion);
    search(index);
  };

  useEffect(() => {
    mouseIsOverRef.current = false;

    if (!autosuggestionsRef.current || !inputRef.current) return;

    autosuggestionsRef.current.onmouseover = () => {
      mouseIsOverRef.current = true;
    };

    autosuggestionsRef.current.onmouseout = () => {
      mouseIsOverRef.current = false;
    };

    inputRef.current.onblur = () => {
      if (mouseIsOverRef.current === false && autosuggestionsRef.current) {
        autosuggestionsRef.current.style.display = 'none';
      }
    };

    return () => {
      if (autosuggestionsRef.current) {
        autosuggestionsRef.current.onmouseover = null;
        autosuggestionsRef.current.onmouseout = null;
      }

      if (inputRef.current) {
        inputRef.current.onblur = null;
      }
    };
  }, []);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') search(index);
  };

  if (!index) return <LoaderSpinner />;

  const capitalized = index.charAt(0).toUpperCase() + index.slice(1);

  return (
    <div className='search'>
      <div className='category'>
        <div className='facade'>
          <span>{capitalized}</span>
          <img src='/images/header/down-arrow.png' width='8' height='6' />
        </div>
        
        <select onChange={onSearchIndexChange} value={index}>
          <option value='recipes'>Recipes</option>
          <option value='ingredients'>Ingredients</option>
          <option value='equipment'>Equipment</option>
        </select>
      </div>

      <div className='insert'>
        <input
          ref={inputRef}
          id='search-input'
          onChange={e => inputChangeHandler(e.target.value)}
          onKeyUp={e => handleKeyUp(e)}
          value={params.term || term}
          spellCheck={false}
          autoComplete='off'
        />

        <div className='magnifying-glass' onClick={() => search(index)}>
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
