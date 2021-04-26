import { useTypedSelector as useSelector } from '../../../store';

export function Feed(): JSX.Element {
  const myContent = useSelector(state => state.data.myContent);
  const officialContent  = useSelector(state => state.data.officialContent);
  const theme = useSelector(state => state.theme.feedTheme);

  return (
    <div className={`feed ${theme}`}>
      {
        [...(myContent && myContent), ...(officialContent && officialContent)]
        .map(c => (
          <div className="feed-item" key={c.id}>
            <h1 className="feed-item__title">{c.title}</h1>
            <span className="feed-item__author">{c.author}</span>
            <img
              className="feed-item__thumbnail"
              src={`https://s3.amazonaws.com/nobsc-user-equipment/${c.image}-thumb`}
            />
            {/*<p className="feed-item__snippet">{c.title}</p>*/}
          </div>
        ))
      }
    </div>
  );
}

//export default Feed;