function getHighlight(hit: any, fieldName: string) {
  if (hit.highlight[fieldName]?.length < 1) return;
  return hit.highlight[fieldName][0];
}

function buildResults(hits: any) {
  const addEachKeyValueToObject = (
    acc: any,
    [key, value]: (Default|string)[]
  ) => ({...acc, [key as string]: value});

  const toObject = (value: any, snippet: any) =>
    ({raw: value, ...(snippet && {snippet})});

  return hits.map((record: any) =>
    Object.entries(record._source).map(([fieldName, fieldValue]) => [
      fieldName,
      toObject(fieldValue, getHighlight(record, fieldName))
    ])
    .reduce(addEachKeyValueToObject, {})
  );
}

function buildTotalPages(resultsPerPage: number, totalResults: number) {
  if (!resultsPerPage) return 0;
  if (totalResults === 0) return 1;
  return Math.ceil(totalResults / resultsPerPage);
}

function getValueFacet(aggs: any, fieldName: string) {
  if (aggs[fieldName]?.buckets?.length > 0) {
    return [{
      field: fieldName,
      type: "value",
      data: aggs[fieldName].buckets.map((bucket: any) => ({ 
        // Note: boolean & date require key_as_string
        value: bucket.key_as_string || bucket.key,
        count: bucket.doc_count
      }))
    }];
  }
}

function buildStateFacets(aggs: any, currIdx: string) {
  if (currIdx === "recipes") {
    const cuisine_name = getValueFacet(aggs, "cuisine_name");
    const method_name = getValueFacet(aggs, "method_name");
    const recipe_type_name = getValueFacet(aggs, "recipe_type_name");
    const facets = {
      ...(cuisine_name && {cuisine_name}),
      ...(method_name && {method_name}),
      ...(recipe_type_name && {recipe_type_name})
    };

    if (Object.keys(facets).length > 0) return facets;
  }
  
  if (currIdx === "ingredients") {
    const ingredient_type_name = getValueFacet(aggs, "ingredient_type_name");
    const facets = {...(ingredient_type_name && {ingredient_type_name})};

    if (Object.keys(facets).length > 0) return facets;
  }
  
  if (currIdx === "equipment") {
    const equipment_type_name = getValueFacet(aggs, "equipment_type_name");
    const facets = {...(equipment_type_name && {equipment_type_name})};

    if (Object.keys(facets).length > 0) return facets;
  }
}

/*
Converts Elasticsearch response to new state. onSearch handler needs to convert
search results into a new state that search-ui understands.

For example, Elasticsearch returns "hits" for search results. This maps to the
"results" property in state, which requires a specific format. buildSearchState
iterates through "hits" and reformats them to "results".

Similar for totals and facets.
*/
export function buildSearchState(
  response: any,
  resultsPerPage: number,
  currentIndex: string
) {
  const results = buildResults(response.hits.hits);
  const totalResults = response.hits.total.value;
  const totalPages = buildTotalPages(resultsPerPage, totalResults);
  const facets = buildStateFacets(response.aggregations, currentIndex);
  
  return {results, totalPages, totalResults, ...(facets && {facets})};
}

type Default = {
  raw: any;
  snippet: any;
};