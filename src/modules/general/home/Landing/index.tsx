import Image from 'next/image';

export function Landing() {
  return (
    <div className="landing">
      <Image
        loading="lazy"
        src="/images/dev/home1.png"
        alt="wholesome"
        width={360}
        height={226}
      />
      <p>Learn about ingredients, cooking methods, and kitchen equipment.</p>
      <p>Browse recipes and save your favorites.</p>
      <p>Create your own private or public recipes.</p>
      <p>Organize recipes into weekly or monthly plans.</p>
      <Image
        loading="lazy"
        src="/images/dev/home3.png"
        alt="fun"
        width={360}
        height={238}
      />
    </div>
  );
}
