import axios from 'axios';

import { endpoint } from '../../../config/api';
import Profile from '../../../modules/user/profile';
import type { ProfileView } from '../../../modules/user/profile';

export default function ProfilePage({ profile }: Props) {
  return <Profile profile={profile} />;
}

export async function getServerSideProps({ params }: ServerSideProps) {
  const res = await axios.get(`${endpoint}/users/${encodeURIComponent(params.username)}`);

  return {
    props: {
      profile: res.data
    }
  };
}

type Props = {
  profile: ProfileView;
};

type ServerSideProps = {
  params: {
    username: string;
  };
};
