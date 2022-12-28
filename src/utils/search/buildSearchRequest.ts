function buildMatch(term: string, index: string) {
  let match;
  if (index === "recipes")     match = {title: {query: term}};
  if (index === "ingredients") match = {fullname: {query: term}};
  if (index === "equipment")   match = {name: {query: term}};

  return term ? {match} : {match_all: {}};
}

function buildFrom(current: number, resultsPerPage: number) {
  return (current - 1) * resultsPerPage;
}

function buildSort(sortDirection: string, sortField: string) {
  if (!sortDirection || !sortField) return;
  return [{[`${sortField}.keyword`]: sortDirection}];
}

// If the value is a boolean, we need to apply our filter differently. And we only store the string representation of the boolean value, so we need to convert it to a Boolean.
function getTermFilterValue(field: any, fieldValue: any) {
  if (fieldValue === "false" || fieldValue === "true") return {[field]: fieldValue === "true"};  // TO DO: better approach for booleans
  return {[`${field}.keyword`]: fieldValue};
}

function getTermFilter(filter: any) {
  if (filter.type === "any") {
    return {
      bool: {
        should: [
          filter.values.map((filterValue: string) => ({
            term: getTermFilterValue(filter.field, filterValue)
          }))
        ],
        minimum_should_match: 1
      }
    };
  }

  if (filter.type === "all") {
    return {
      bool: {
        filter: [
          filter.values.map((filterValue: string) => ({
            term: getTermFilterValue(filter.field, filterValue)
          }))
        ]
      }
    };
  }
}

function buildRequestFilter(filters: any, index: string) {
  if (!filters) return;

  filters = filters.reduce((acc: any, filter: any) => {
    // TO DO: allergy ingredients (index them first)
    if (index === "recipes" && ["cuisine_name", "method_name", "recipe_type_name"].includes(filter.field))
      return [...acc, getTermFilter(filter)];
    
    if (index === "ingredients" && ["ingredient_type_name"].includes(filter.field))
      return [...acc, getTermFilter(filter)];
    
    if (index === "equipment" && ["equipment_type_name"].includes(filter.field))
      return [...acc, getTermFilter(filter)];

    return acc;
  }, []);

  if (filters.length < 1) return;

  return filters;
}

/*
Converts current state into an Elasticsearch request.
The onSearch handler needs the current state converted to an API request.

For example, the "current" property below is the current page in pagination.
buildSearchRequest converts "current" property to "from" parameter.

The "current" property is a page offset, while Elasticsearch's "from" parameter is an item offset.
For a set of 100 results and a page size of 10, if our "current" is 4, then the equivalent Elasticsearch "from" would be 40.
buildSearchRequest does that conversion.

And similar things for filters, searchTerm, sort, etc.
*/
export function buildSearchRequest(state: any, index: string) {
  const { current, filters, resultsPerPage, searchTerm, sortDirection, sortField } = state;

  const match = buildMatch(searchTerm, index);
  const filter = buildRequestFilter(filters, index);
  const sort = buildSort(sortDirection, sortField);

  const from = buildFrom(current, resultsPerPage);  // starting
  const size = resultsPerPage;                      // limit

  let aggs;
  let highlightFields;

  if (index === "recipes") {
    aggs = {
      cuisine_name: {terms: {field: "cuisine_name"}},
      method_name: {terms: {fields: "method_name"}},
      recipe_type_name: {terms: {field: "recipe_type_name"}}
    };
    highlightFields = {title: {}};
  }

  if (index === "ingredients") {
    aggs = {ingredient_type_name: {terms: {field: "ingredient_type_name"}}};
    highlightFields = {fullname: {}};
  }

  if (index === "equipment") {
    aggs = {equipment_type_name: {terms: {field: "equipment_type_name"}}};
    highlightFields = {name: {}};
  }

  return {
    aggs,
    highlight: {
      fragment_size: 200,  // less?
      number_of_fragments: 1,
      fields: highlightFields
    },
    query: {
      bool: {
        must: [match],
        ...(filter && {filter})
      }
    },
    ...(sort && {sort}),
    ...(from && {from}),
    ...(size && {size})
  };
}