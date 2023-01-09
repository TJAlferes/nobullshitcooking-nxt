import Link from 'next/link';

const url = "https://s3.amazonaws.com/nobsc-images-01/header/announcements/";

export function Promo(): JSX.Element {
  return (
    <Link href="/">
      <a className="promo">
        <img className="large" src={`${url}announcement-05-03-17-240w.png`} />
        <img className="small" src={`${url}announcement-05-03-17-180w.png`} />
      </a>
    </Link>
  );
}