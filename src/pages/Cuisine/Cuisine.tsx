import { useRouter } from 'next/router'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { LoaderSpinner } from '../../components/LoaderSpinner/LoaderSpinner';
import {
  NOBSCBackendAPIEndpointOne
} from '../../config/NOBSCBackendAPIEndpointOne';
import { useTypedSelector as useSelector } from '../../store';
import { CuisineView } from './CuisineView';

const endpoint = NOBSCBackendAPIEndpointOne;
const googleMapsAPIKeyTwo = 'AIzaSyA1caERqL2MD4rv2YmbJ139ToyxgT61v6w';

export default function Cuisine({ oneColumnATheme }: Props): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const dataCuisines = useSelector(state => state.data.cuisines);

  const [ address, setAddress ] = useState("");
  const [ cuisine, setCuisine ] = useState<ICuisineDetail>();
  const [ latitude, setLatitude ] = useState("");
  const [ longitude, setLongitude ] = useState("");
  const [ nearbyStoresClicked, setNearbyStoresClicked ] = useState(false);
  const [ tab, setTab ] = useState("intro");

  useEffect(() => {
    if (!id) {
      router.push('/page/guide/food/cuisines');
      return;
    }

    const isCuisine = dataCuisines.find(c => c.id === Number(id));

    if (!isCuisine) {
      router.push('/page/guide/food/cuisines');
      return;
    }

    const getCuisineDetail = async (id: number) => {
      const res = await axios.get(`${endpoint}/cuisine/detail/${id}`);
      if (res.data) setCuisine(res.data);
    };

    if (id && isCuisine) getCuisineDetail(Number(id));
  }, []);

  useEffect(() => {
    const getAddress = async () => {
      if (latitude === "") return;
      if (longitude === "") return;

      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsAPIKeyTwo}`
      );

      if (res.data) setAddress(res.data.results[3].formatted_address);
    };

    getAddress();
  }, [latitude, longitude]);

  const getLocation = async () => {
    const geolocation = navigator.geolocation;

    geolocation.getCurrentPosition(function(position) {
      setLatitude(`${position.coords.latitude}`);
      setLongitude(`${position.coords.longitude}`);
    });
  };

  const handleShowNearbyStoresClick = () => {
    setNearbyStoresClicked(true);
    getLocation();
  };

  const handleTabChange = (value: string) => setTab(value);

  return !cuisine
  ? <LoaderSpinner />
  : (
    <CuisineView
      address={address}
      cuisine={cuisine}
      handleShowNearbyStoresClick={handleShowNearbyStoresClick}
      handleTabChange={handleTabChange}
      latitude={latitude}
      longitude={longitude}
      nearbyStoresClicked={nearbyStoresClicked}
      oneColumnATheme={oneColumnATheme}
      tab={tab}
    />
  );
}

export interface ICuisineDetail {
  id: number;
  name: string;
  nation: string;
  wiki: string;
  intro: string;
  equipment: ICuisineEquipment[];
  ingredients: ICuisineIngredient[];
  recipes: ICuisineRecipe[];
  suppliers: ICuisineSupplier[];
}

interface ICuisineEquipment {
  id: number;
  name: string;
}

interface ICuisineIngredient {
  id: number;
  name: string;
}

interface ICuisineRecipe {
  id: number;
  title: string;
}

interface ICuisineSupplier {
  id: number;
  name: string;
}

type Props = {
  oneColumnATheme: string;
};