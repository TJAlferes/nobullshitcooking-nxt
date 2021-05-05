function getHighlight(hit: any, fieldName: string) {
  if (hit.highlight[fieldName]?.length < 1) return;
  return hit.highlight[fieldName][0];
}

function buildResults(hits: any, currIdx: string) {
  const addEachKeyValueToObject = (
    acc: any,
    [key, value]: (Default|string)[]
  ) => ({...acc, [key as string]: value});

  const toObject = (value: any, snippet: any) =>
    ({raw: value, ...(snippet && {snippet})});

  // TO DO: WTF is this?
  let idValue: string;
  if (currIdx === "recipes") idValue = "id";
  if (currIdx === "ingredients") idValue = "id";
  if (currIdx === "equipment") idValue = "id";

  return hits.map((record: any) => ({
    id: {raw: record._source[idValue]},
    ...(
      Object.entries(record._source).map(([fieldName, fieldValue]) => [
        fieldName,
        toObject(fieldValue, getHighlight(record, fieldName))
      ])
      .reduce(addEachKeyValueToObject, {})
    )
  }));
}

export function buildAutocompleteState(response: any, currIdx: string) {
  const results = buildResults(response.hits.hits, currIdx);
  return {results};
}

// TO DO: rename and finish
type Default = {
  raw: any;
  snippet: any;
};