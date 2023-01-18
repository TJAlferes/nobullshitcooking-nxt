export default function NotFound404({ theme }: Props): JSX.Element {
  return (
    <div className={`not-found one-column-a ${theme}`}>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}

type Props = {
  theme: string;
};