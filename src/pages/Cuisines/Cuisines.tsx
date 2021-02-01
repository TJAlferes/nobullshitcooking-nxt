import Link from 'next/link';
import React from 'react';

import { useTypedSelector as useSelector } from '../../store';
import './cuisines.css';

export default function Cuisines({ oneColumnATheme }: Props): JSX.Element {
  const cuisines = useSelector(state => state.data.cuisines);

  const alphabetizedCuisines = cuisines
  .reduce((acc: AlphabetizedCuisines, cuisine) => {
    const firstLetter = cuisine['nation'][0].toLocaleUpperCase();

    if (acc[firstLetter]) acc[firstLetter].push(cuisine['nation']);
    else acc[firstLetter] = [cuisine['nation']];

    return acc;
  }, {});

  const letters = Object.keys(alphabetizedCuisines);
  const nations: any[] = Object.values(alphabetizedCuisines);

  let i = 0;

  return (
    <div className={`cuisines one-column-a ${oneColumnATheme}`}>
      <h1 className="cuisine-nav-title">Cuisines</h1>

      {letters.length && letters.map((letter, index) => (
        <div className="cuisine-nav-group" key={letter}>
          <div className="cuisine-nav-letter">{letter}</div>
          {nations[index].map((nation: string) => {
            i++;
            return (
              <div className="cuisine-nav-nation" key={nation}>
                <Link href={`/food/cuisines/${cuisines[i - 1].id}`}>
                  <a className="cuisine-nav-nation-link">{nation}</a>
                </Link>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

type Props = {
  oneColumnATheme: string;
};

type AlphabetizedCuisines = {
  [index: string]: any;
};