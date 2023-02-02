function getHighlight(hit: any, fieldName: string) {
  if (hit.highlight[fieldName]?.length < 1) return;
  
  return hit.highlight[fieldName][0];
}

function buildResults(hits: any, index: string) {
  const addEachKeyValueToObject = (
    acc: any,
    [ key, value ]: (Default|string)[]
  ) => ({
    ...acc,
    [key as string]: value
  });

  const toObject = (value: any, snippet: any) => ({raw: value, ...(snippet && {snippet})});

  // TO DO: WTF is this? let idValue: string;if (index === "recipes") idValue = "id";if (index === "ingredients") idValue = "id";if (index === "equipment") idValue = "id";

  return hits.map((record: any) => ({
    id: {raw: record._source["id"]},
    ...(
      Object.entries(record._source)
        .map(([ fieldName, fieldValue ]) => [fieldName, {raw: fieldValue}])
        .reduce(addEachKeyValueToObject, {})
    )
  }));
}

export function buildAutocompleteState(response: any, index: string) {
  const results = buildResults(response.hits.hits, index);
  return {results};
}

type Default = {  // TO DO: rename and finish
  raw:     any;
  snippet?: any;
};
/*
toObject(
  fieldValue,
  getHighlight(record, fieldName)
)

{raw: fieldValue}
*/