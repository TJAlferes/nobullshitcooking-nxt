function buildMatch(term: string, currIdx: string) {
  let match;
  if (currIdx === "recipes") match = {title: {query: term}};
  if (currIdx === "ingredients") match = {fullname: {query: term}};
  if (currIdx === "equipment") match = {name: {query: term}};
  return term ? {match} : {match_all: {}};
}

function buildFrom(current: number, resultsPerPage: number) {
  return (current - 1) * resultsPerPage;
}

function buildSort(sortDirection: string, sortField: string) {
  return [{[`${sortField}.keyword`]: sortDirection}];
}

function getTermFilterValue(field: any, fieldValue: any) {
  return {[`${field}`]: fieldValue};
}

function getTermFilter(filter: any) {
  if (filter.type === "all") {
    return {
      bool: {
        filter: [
          filter.values.map((v: any) => ({
            term: getTermFilterValue(filter.field, v)
          }))
        ]
      }
    };
  }

  if (filter.type === "any") {
    return {
      bool: {
        should: [
          filter.values.map((v: any) => ({
            term: getTermFilterValue(filter.field, v)
          }))
        ],
        minimum_should_match: 1
      }
    };
  }
}

function buildRequestFilter(filters: any, currIdx: string) {
  if (!filters) return;

  filters = filters.reduce((acc: any, filter: any) => {
    // TO DO: allergy ingredients (index them first)
    if (
      currIdx === "recipes" &&
      ["cuisine_name", "method_name", "recipe_type_name"]
        .includes(filter.field)
    ) return [...acc, getTermFilter(filter)];
    
    if (
      currIdx === "ingredients" &&
      ["ingredient_type_name"].includes(filter.field)
    ) return [...acc, getTermFilter(filter)];
    
    if (
      currIdx === "equipment" &&
      ["equipment_type_name"].includes(filter.field)
    ) return [...acc, getTermFilter(filter)];
  }, []);

  if (filters.length < 1) return;

  return filters;
}

export function buildSearchRequest(state: any, currIdx: string) {
  const { searchTerm, filters, current, resultsPerPage } = state;

  const match = buildMatch(searchTerm, currIdx);
  const filter = buildRequestFilter(filters, currIdx);
  const from = buildFrom(current, resultsPerPage);  // starting
  const size = resultsPerPage;  // limit

  let aggs;
  let highlightFields;

  if (currIdx === "recipes") {
    aggs = {
      cuisine_name: {terms: {field: "cuisine_name"}},
      method_name: {terms: {fields: "method_name"}},
      recipe_type_name: {terms: {field: "recipe_type_name"}}
    };
    highlightFields = {title: {}};
  }

  if (currIdx === "ingredients") {
    aggs = {ingredient_type_name: {terms: {field: "ingredient_type_name"}}};
    highlightFields = {fullname: {}};
  }

  if (currIdx === "equipment") {
    aggs = {equipment_type_name: {terms: {field: "equipment_type_name"}}};
    highlightFields = {name: {}};
  }

  const body = {
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
    ...(from && {from}),
    ...(size && {size})
  };
  
  return body;
}