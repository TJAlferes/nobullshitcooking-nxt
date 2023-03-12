export function ResultsPerPage({ handler, resultsPerPage }: ResultsPerPageProps) {
  return (
    <div>
      <label>Results per page:</label>
      <select onChange={handler} value={resultsPerPage}>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type ResultsPerPageProps = {
  resultsPerPage:             string;
  handler(e: SyntheticEvent): void;
};
