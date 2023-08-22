import Image from 'next/image';

export function Landing() {
  return (
    <div className="two-col-left landing">
      <p>Cook the food you want to eat: simple, affordable, energizing, satisfying.</p>
      <p>No Bullshit Cooking provides discipline, information, direction, and community.</p>

      <Image loading="lazy" src="/images/dev/home1.png" alt="wholesome" width={360} height={226} />

      <p>Browse recipes and save your favorites.</p>
      <p>Organize recipes into weekly or monthly plans.</p>
      <p>Create your own private or public recipes.</p>

      <Image loading="lazy" src="/images/dev/home2.png" alt="fruits and vegetables" width={360} height={121} />

      <p>Learn about ingredients, cooking methods, and kitchen equipment.</p>
      <p>Achieve your health and fitness goals.</p>
      <p>Have fun with friends and family.</p>

      <Image loading="lazy" src="/images/dev/home3.png" alt="fun" width={360} height={238} />
    </div>
  );
}
