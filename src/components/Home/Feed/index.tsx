export function Feed(): JSX.Element {
  const officialContent = [
    {id: 1, image: "image1", title: "Title1", author: "Author1"},
    {id: 2, image: "image2", title: "Title2", author: "Author2"},
    {id: 3, image: "image3", title: "Title3", author: "Author3"},
  ];

  return (
    <div className="feed">
      {[...(officialContent && officialContent)]
        .map(c => (
          <div className="feed-item" key={c.id}>
            <h1 className="feed-item__title">{c.title}</h1>
            <span className="feed-item__author">{c.author}</span>
            <img className="feed-item__thumbnail" src={`https://s3.amazonaws.com/nobsc-user-equipment/${c.image}-thumb`} />
            {/*<p className="feed-item__snippet">{c.title}</p>*/}
          </div>
        ))
      }
    </div>
  );
}
