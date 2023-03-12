export function Pagination({ totalPages, currentPage, handler }: PaginationProps) {
  if (totalPages <= 1) return null;

  const first =   1;
  const prev =    currentPage - 1;
  const curr =    currentPage;
  const next =    currentPage + 1;
  const last =    totalPages;

  return (
    <div>
                      <span onClick={() => handler(first)}>First</span>
      {curr > 1 &&    <span onClick={() => handler(prev)}>Prev</span>}
                      <span onClick={() => handler(curr)}>{curr}</span>
      {curr < last && <span onClick={() => handler(next)}>Next</span>}
                      <span onClick={() => handler(last)}>Last</span>
    </div>
  );
}

type PaginationProps = {
  totalPages:            number;
  currentPage:           number;
  handler(page: number): void;
};
