import { SearchBox, withSearch } from '@elastic/react-search-ui';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../../store';
import { searchSetIndex } from '../../../store/search/actions';
import { AutocompleteView } from './view';

export function Search({ searchTerm, setSearchTerm }: Props): JSX.Element {
  const router = useRouter();

  const dispatch = useDispatch();
  const currentIndex = useSelector(state => state.search.currentIndex);
  const theme = useSelector(state => state.theme.theme);

  const changeSearchIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sInsert = document
      .getElementsByClassName("sui-search-box__wrapper")[0]
      .firstChild as HTMLElement;

    dispatch(searchSetIndex(e.target.value));

    sInsert.focus();
  }

  const selectAutocomplete = (selection: any) => {
    setSearchTerm(selection[field as string].raw);
    router.push(`/${currentIndex}`);
  };

  const submit = () => {
    setSearchTerm(searchTerm);
    redirectToSearchPage();
  };

  const redirectToSearchPage = () => {
    router.push(`/${currentIndex}`);
  };

  const facadeText =
    currentIndex.charAt(0).toUpperCase() + currentIndex.slice(1);

  let field: string | undefined;

  if (currentIndex === "recipes") field = "title";
  if (currentIndex === "ingredients") field = "fullname";
  if (currentIndex === "equipment") field = "name";
  if (currentIndex === "products") field = "fullname";

  return (
    <div className={`search ${theme}`}>
      <div className="search-category">
        <div className="search-facade">
          <span className="search-facade-text">{facadeText}</span>

          <img
            className="search-facade-arrow"
            src="/images/header/down-arrow-gray.png"
            width="8"
            height="6"
          />
        </div>

        <select className="search-filters" onChange={changeSearchIndex}>
          <option className="search-filter" value="recipes">
            Recipes
          </option>

          <option className="search-filter" value="ingredients">
            Ingredients
          </option>

          <option className="search-filter" value="equipment">
            Equipment
          </option>

          <option className="search-filter" value="products">
            Products
          </option>
        </select>
      </div>

      <div className="search-insert">
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

        <div className="magnifying-glass-holder" onClick={submit}>
          <span className="magnifying-glass"></span>
        </div>
      </div>
    </div>
  );
}

interface RootContext {
  searchTerm: string;
  setSearchTerm: any;
}

type Props = {
  searchTerm: string;
  setSearchTerm: any;
};

export default withSearch(
  ({ searchTerm, setSearchTerm }: RootContext) => ({searchTerm, setSearchTerm})
)(Search);