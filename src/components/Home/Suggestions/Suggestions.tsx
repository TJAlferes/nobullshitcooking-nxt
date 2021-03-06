import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../../store';
import {
  geoAddress,
  geoLatitude,
  geoLongitude,
  geoNearbyStoresClicked
} from '../../../store/geolocation/actions';
import { SuggestionsView } from './SuggestionsView';

const googleMapsAPIKeyTwo = 'AIzaSyA1caERqL2MD4rv2YmbJ139ToyxgT61v6w';

export function Suggestions(): JSX.Element {
  const dispatch = useDispatch();

  const address = useSelector(state => state.geolocation.address);
  const latitude = useSelector(state => state.geolocation.latitude);
  const longitude = useSelector(state => state.geolocation.longitude);
  const nearbyStoresClicked =
    useSelector(state => state.geolocation.nearbyStoresClicked);
  const theme = useSelector(state => state.theme.suggestionsTheme);

  useEffect(() => {
    const getAddress = async () => {
      if (latitude === "") return;
      if (longitude === "") return;
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsAPIKeyTwo}`
      );
      if (res.data) dispatch(geoAddress(res.data.results[3].formatted_address));
    };
    getAddress();
  }, [latitude, longitude]);

  const getLocation = async () => {
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition(function(position) {
      dispatch(geoLatitude(`${position.coords.latitude}`));
      dispatch(geoLongitude(`${position.coords.longitude}`));
    });
  };

  const handleShowNearbyStoresClick = () => {
    dispatch(geoNearbyStoresClicked(true));
    getLocation();
  };

  return (
    <SuggestionsView
      address={address}
      latitude={latitude}
      longitude={longitude}
      handleShowNearbyStoresClick={handleShowNearbyStoresClick}
      nearbyStoresClicked={nearbyStoresClicked}
      theme={theme}
    />
  );
}

//export default Suggestions;