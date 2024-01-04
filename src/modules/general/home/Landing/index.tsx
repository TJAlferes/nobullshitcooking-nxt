import Image from 'next/image';

export function Landing() {
  return (
    <div className="landing">
      <h1>Let's get cooking!</h1>
      <Image
        loading="lazy"
        src="/images/dev/home3.png"
        alt="fun"
        width={360}
        height={238}
      />
      
      {/*<p>Learn about ingredients, cooking methods, and kitchen equipment.</p>*/}

      {/*<p>Browse recipes and save your favorites.</p>
      <Image
        loading="lazy"
        src="https://s3.amazonaws.com/nobsc-official-uploads/page/landing-sample-01.jpg"
        alt="favorite"
        width={360}
        height={238}
      />*/}

      <h1>Organize recipes into weekly or monthly plans:</h1>
      <Image
        loading="lazy"
        src="https://s3.amazonaws.com/nobsc-official-uploads/page/landing-sample-03.jpg"
        alt="organize"
        width={821}
        height={281}
      />

      <h1>Create your own private or public recipes:</h1>
      <Image
        loading="lazy"
        src="https://s3.amazonaws.com/nobsc-official-uploads/page/landing-sample-02.jpg"
        alt="create"
        width={560}
        height={560}
      />
    </div>
  );
}
