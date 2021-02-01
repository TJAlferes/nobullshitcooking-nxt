import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Node } from 'slate';

import { LoaderSpinner } from '../../components/LoaderSpinner/LoaderSpinner';
import {
  NOBSCBackendAPIEndpointOne
} from '../../config/NOBSCBackendAPIEndpointOne';
import { ContentView } from './ContentView';

const endpoint = NOBSCBackendAPIEndpointOne;

export default function Content({ oneColumnATheme }: Props): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const [ contents, setContents ] = useState<Node[]|null>(null);

  useEffect(() => {
    if (!id) {
      router.push('/home');
      return;
    }

    const getContents = async (id: number) => {
      const res = await axios.get(`${endpoint}/content/${id}`);
      if (res.data.contents) setContents(res.data.contents);
    };

    if (id) getContents(Number(id));
  }, []);

  return !contents
  ? <LoaderSpinner />
  : <ContentView contents={contents} oneColumnATheme={oneColumnATheme} />;
}

type Props = {
  oneColumnATheme: string;
};