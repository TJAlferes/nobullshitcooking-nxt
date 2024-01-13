import Image from 'next/image';

import { useTheme } from '../../store';

export default function HelpPage() {
  const { theme } = useTheme();

  const url = 'https://s3.amazonaws.com/nobsc-official-uploads/page';

  return (
    <div className="one-col help">
      <h1>Help</h1>

      <h3>How To Navigate</h3>
      <p>Use the navigation menu icon (three horizontal lines) at the top left of the screen:</p>
      <Image
        loading="lazy"
        src={`${url}/help-site-nav-${theme}.jpg`}
        alt="help-site-navigation"
        width={280}
        height={280}
      />
      <p>Likewise, some pages may also have their own navigation menu icon (three horizontal lines):</p>
      <Image
        loading="lazy"
        src={`${url}/help-page-nav-${theme}.jpg`}
        alt="help-page-navigation"
        width={280}
        height={280}
      />
    </div>
  );
}
