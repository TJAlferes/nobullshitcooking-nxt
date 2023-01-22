import { SearchBox, withSearch } from '@elastic/react-search-ui';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../../store';
import { setIndex } from '../../../store/search/actions';
import { AutocompleteView } from './view';

export function Search({ searchTerm, setSearchTerm }: Props): JSX.Element {
  const router = useRouter();

  const dispatch = useDispatch();
  const index = useSelector(state => state.search.index);
  const theme = useSelector(state => state.theme.theme);

  const changeSearchIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sInsert = document.getElementsByClassName("sui-search-box__wrapper")[0]?.firstChild as HTMLElement;
    dispatch(setIndex(e.target.value));
    sInsert.focus();
  }

  const selectAutocomplete = (selection: any) => {
    setSearchTerm(selection[field as string].raw);
    router.push(`/${index}`);
  };

  const submit = () => {
    setSearchTerm(searchTerm);
    redirectToSearchPage();
  };

  const redirectToSearchPage = () => router.push(`/${index}`);

  const facadeText = index.charAt(0).toUpperCase() + index.slice(1);

  let field: string | undefined;
  if (index === "recipes")     field = "title";
  if (index === "ingredients") field = "fullname";
  if (index === "equipment")   field = "name";
  if (index === "products")    field = "fullname";

  return (
    <div className={`search ${theme}`}>
      <div className="category">
        <div className="facade">
          <span>{facadeText}</span>
          <img src="/images/header/down-arrow-gray.png" width="8" height="6" />
        </div>
        <select className="filters" onChange={changeSearchIndex}>
          <option value="recipes">Recipes</option>
          <option value="ingredients">Ingredients</option>
          <option value="equipment">Equipment</option>
          <option value="products">Products</option>
        </select>
      </div>

      <div className="insert">
        <SearchBox
          autocompleteMinimumCharacters={2}
          autocompleteResults={{
            shouldTrackClickThrough: true,
            titleField: field as string,
            urlField: field as string
          }}
          autocompleteView={AutocompleteView}
          inputProps={{placeholder: ""}}
          onSelectAutocomplete={selectAutocomplete}
          onSubmit={submit}
        />

        <div className="magnifying-glass" onClick={submit}><span></span></div>
      </div>
    </div>
  );
}

interface RootContext {
  searchTerm?:   string;
  setSearchTerm: any;
}

type Props = {
  searchTerm:    string;
  setSearchTerm: any;
};

export default withSearch(
  ({ searchTerm, setSearchTerm }: RootContext) => ({searchTerm, setSearchTerm})
)(Search);