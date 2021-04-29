import { SearchBox, withSearch } from '@elastic/react-search-ui';
//import Image from 'next/image'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../../store';
import { searchSetIndex } from '../../../store/search/actions';
import { AutocompleteView } from './AutocompleteView';

export function Search({
  searchTerm,
  setSearchTerm,
  theme
}: Props): JSX.Element {
  const router = useRouter();

  const dispatch = useDispatch();
  const currentIndex = useSelector(state => state.search.currentIndex);

  const changeSearchIndex = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // use responsive design instead of adaptive design?
    //.getElementsByClassName("sui-search-box__wrapper")[1]
    const sInsert = document
      .getElementsByClassName("sui-search-box__wrapper")[0]
      .firstChild as HTMLElement;

    dispatch(searchSetIndex(e.target.value));

    sInsert.focus();
  }

  const handleSelectAutocomplete = (selection: any) => {
    setSearchTerm(selection[field as string].raw);
    router.push(`/${currentIndex}`);
  };

  const handleSubmit = () => {
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
      <div className="search__category">
        <div className="search__facade">
          <span className="search__facade-text">{facadeText}</span>

          <img
            className="search__facade-arrow"
            src="/images/header/down-arrow-gray.png"
            width="8"
            height="6"
          />
        </div>

        <select className="search__prefilters" onChange={changeSearchIndex}>
          <option className="search__prefilter" value="recipes">
            Recipes
          </option>

          <option className="search__prefilter" value="ingredients">
            Ingredients
          </option>

          <option className="search__prefilter" value="equipment">
            Equipment
          </option>

          <option className="search__prefilter" value="products">
            Products
          </option>
        </select>
      </div>

      <div className="search__insert">
        <SearchBox
          autocompleteMinimumCharacters={2}
          autocompleteResults={{
            //clickThroughTags: string[],
            //linkTarget: "",
            //sectionTitle: "",
            shouldTrackClickThrough: true,
            titleField: field as string,
            urlField: field as string
          }}
          autocompleteView={AutocompleteView}
          //className=""
          inputProps={{placeholder: ""}}
          onSelectAutocomplete={handleSelectAutocomplete}
          onSubmit={handleSubmit}
        />
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
  theme: string;
};

const mapContextToProps = ({ searchTerm, setSearchTerm }: RootContext) => ({
  searchTerm,
  setSearchTerm
});

export default withSearch(mapContextToProps)(Search);