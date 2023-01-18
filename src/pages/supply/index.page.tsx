// TO DO: just make this a page in the CMS?
export function Supply({ theme }: Props): JSX.Element {
  return (
    <div className={`supply one-column-a ${theme}`}>
      <h1>Supply (marketing page)</h1>
    </div>
  );
}

type Props = {
  theme: string;
};