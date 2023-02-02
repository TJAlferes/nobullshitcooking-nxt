import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';

const s3Path = 'https://s3.amazonaws.com/nobsc-images-01/content';

export default function Navigation({ links, name, path }: Props): JSX.Element {
  const [ contentLinks, setContentLinks ] = useState<IContentLink[] | null>(null);

  useEffect(() => {
    const getContentLinksByTypeName = async (name: string) => {
      const res = await axios.get(`${endpoint}/content/links/${name}`);
      if (res.data) setContentLinks(res.data);
    };
    if (!links) getContentLinksByTypeName(name);  // if it was a leaf node
  }, []);

  return (
    <div className="cms-navigation one-col-a">
      <h1>{name}</h1>

      <div className="nav-grid-a">
        {links && links.map((link: any) => (
          <div className="nav-grid-a-item" key={link.path}>
            <Link href={`${link.path}`}>
              <span className="nav-grid-a-item-text">{link.name}</span>
              {/*<img className="nav-grid-a-item-image" src={`${s3Path}/${link.category}/${link.image}`} />*/}
            </Link>
          </div>
        ))}

        {contentLinks && contentLinks.map((link: any) => (
          <div className="nav-grid-a-item" key={link.path}>
            <Link href={`${link.path}`}>
              <span className="nav-grid-a-item-text">{link.name}</span>
              {/*<img className="nav-grid-a-item-image" src={`${s3Path}/${link.category}/${link.image}`} />*/}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

//.png

type Props = {
  links: any[];
  name:  string;
  path:  string;
};

interface IContentLink {
  content_id:        number;
  content_type_id:   number;
  content_type_name: string;
  published:         string;
  title:             string;
}