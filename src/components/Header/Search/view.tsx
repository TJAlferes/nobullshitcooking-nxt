import type { SearchBoxAutocompleteViewProps } from "@elastic/react-search-ui-views";

function getRaw(result: IResult, value: string) {
  if (!result[value] || !result[value]?.raw) return "";
  return result[value]!.raw;
}

function getSnippet(result: IResult, value: string) {
  if (!result[value] || !result[value]?.snippet) return "";
  return result[value]!.snippet;
}

// why use dangerouslySetInnerHTML?
export function AutocompleteView({ autocompleteResults, autocompletedResults, className, getItemProps, getMenuProps }: SearchBoxAutocompleteViewProps) {
  let index = 0;

  return (
    <div {...getMenuProps({className: `sui-search-box__autocomplete-container ${className}`})}>
      {!!autocompleteResults && !!autocompletedResults && autocompletedResults.length > 0 &&
        (
          <ul className="sui-search-box__results-list">
            {autocompletedResults.map(r => {
              const titleRaw =     getRaw(r, r.titleField);
              const titleSnippet = getSnippet(r, r.titleField);
              
              index++;

              return (
                <li {...getItemProps({key: r.id.raw, index: index - 1, item: r})}>
                  {titleSnippet ? <span dangerouslySetInnerHTML={{__html: titleSnippet}} /> : <span>{titleRaw}</span>}
                </li>
              );
            })}
          </ul>
        )
      }
    </div>
  );
}

interface IResult {
  [index: string]: IResultValue;
}

interface IResultValue {
  raw:     string;
  snippet: string;
}

/*type Props = {
  allAutocompletedItemsCount: number;
  autocompleteResults: {
    titleField:   string;
    urlField:     string;
    linkTarget:   string;
    sectionTitle: string;
  };
  autocompletedResults:     any[],
  className:                string;
  getItemProps(props: any): any;
  getMenuProps(props: any): any;
};*/