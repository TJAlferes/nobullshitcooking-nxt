function getHighlight(hit: any, fieldName: string) {
  if (hit.highlight[fieldName]?.length < 1) return;
  return hit.highlight[fieldName][0];
}

function buildResults(hits: any) {
  const addEachKeyValueToObject = (acc: any, [key, value]: (Default|string)[]) => ({...acc, [key as string]: value});

  const toObject = (value: any, snippet: any) => ({raw: value, ...(snippet && {snippet})});

  return hits.map((record: any) =>
    Object.entries(record._source)
    .map(([fieldName, fieldValue]) => [fieldName, toObject(fieldValue, getHighlight(record, fieldName))])
    .reduce(addEachKeyValueToObject, {})
  );
}

function buildTotalPages(resultsPerPage: number | undefined, totalResults: number) {
  if (!resultsPerPage) return 0;
  if (totalResults === 0) return 1;
  return Math.ceil(totalResults / resultsPerPage);
}

function getValueFacet(aggs: any, fieldName: string) {
  console.log("hello");
  return [{
    field: fieldName,
    type: "value",
    data: [
      {count: 1, value: "Drink"},
      {count: 1, value: "Appetizer"},
      {count: 1, value: "Main"},
      {count: 1, value: "Side"},
      {count: 1, value: "Dessert"},
      {count: 1, value: "Soup"},
      {count: 1, value: "Salad"},
      {count: 1, value: "Stew"},
      {count: 1, value: "Casserole"},
      {count: 1, value: "Sauce"},
      {count: 1, value: "Dressing"},
      {count: 1, value: "Condiment"}
    ]
  }];
  /*if (aggs[fieldName]?.buckets?.length > 0) {
    return [{
      field: fieldName,
      type: "value",
      data: aggs[fieldName].buckets.map((bucket: any) => ({
        value: bucket.key_as_string || bucket.key,  // boolean & date require key_as_string
        count: bucket.doc_count
      }))
    }];
  }*/
}

function buildStateFacets(aggs: any, index: string) {
  if (index === "recipes") {
    const cuisine_name =     getValueFacet(aggs, "cuisine_name");
    const method_name =      getValueFacet(aggs, "method_name");
    const recipe_type_name = getValueFacet(aggs, "recipe_type_name");
    const facets = {
      ...(cuisine_name && {cuisine_name}),
      ...(method_name && {method_name}),
      ...(recipe_type_name && {recipe_type_name})
    };

    if (Object.keys(facets).length > 0) return facets;
  }
  
  if (index === "ingredients") {
    const ingredient_type_name = getValueFacet(aggs, "ingredient_type_name");
    const facets = {...(ingredient_type_name && {ingredient_type_name})};

    if (Object.keys(facets).length > 0) return facets;
  }
  
  if (index === "equipments") {
    const equipment_type_name = getValueFacet(aggs, "equipment_type_name");
    const facets = {...(equipment_type_name && {equipment_type_name})};

    if (Object.keys(facets).length > 0) return facets;
  }
}

/*
Converts Elasticsearch response to new state.
onSearch handler needs to convert search results into a new state that search-ui understands.

For example, Elasticsearch returns "hits" for search results.
This maps to the "results" property in state, which requires a specific format.
buildSearchState iterates through "hits" and reformats them to "results".

Similar for totals and facets.
*/
export function buildSearchState(response: any, resultsPerPage: number | undefined, currentIndex: string) {
  const results = buildResults(response.hits.hits);
  const totalResults = response.hits.total.value;
  const totalPages = buildTotalPages(resultsPerPage, totalResults);
  const facets = buildStateFacets(response.aggregations, currentIndex);
  
  return {results, totalPages, totalResults, ...(facets && {facets})};
}

type Default = {
  raw:     any;
  snippet: any;
};