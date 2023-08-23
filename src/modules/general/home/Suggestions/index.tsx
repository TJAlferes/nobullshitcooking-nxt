import axios           from 'axios';
import { useEffect }   from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector as useSelector } from '../../../../redux';
import { geoAddress, geoLatitude, geoLongitude, geoNearbyStoresClicked } from '../../../shared/geolocation/state';

const googleMapsAPIKeyOne = 'AIzaSyCULKDLxoF9O413jjvF5Ot2xXXMdgz0Eag';  // renew
const googleMapsAPIKeyTwo = 'AIzaSyA1caERqL2MD4rv2YmbJ139ToyxgT61v6w';
const geoUrl              = 'https://maps.googleapis.com/maps/api/geocode/json';
const mapUrl              = 'https://www.google.com/maps/embed/v1/search';

export function Suggestions() {
  const dispatch = useDispatch();

  const address             = useSelector(state => state.geolocation.address);  // why do these need to be in redux again?
  const latitude            = useSelector(state => state.geolocation.latitude);
  const longitude           = useSelector(state => state.geolocation.longitude);
  const nearbyStoresClicked = useSelector(state => state.geolocation.nearbyStoresClicked);

  useEffect(() => {
    let mounted = true;

    async function getAddress() {
      if (latitude === "" || longitude === "") {
        return;
      }

      const res = await axios.get(
        `${geoUrl}?latlng=${latitude},${longitude}&key=${googleMapsAPIKeyTwo}`
      );

      if (res.data) {
        dispatch(geoAddress(res.data.results[3].formatted_address));
      }
    }

    getAddress();

    return () => {
      mounted = false;
    };
  }, [latitude, longitude]);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      dispatch(geoLatitude(`${position.coords.latitude}`));
      dispatch(geoLongitude(`${position.coords.longitude}`));
    });
  };

  const handleShowNearbyStoresClick = () => {
    dispatch(geoNearbyStoresClicked(true));
    getLocation();
  };

  return (
    <div className="two-col-right suggestions">
      <span>Stores near you</span>
      <div className="nearby-stores">
        {nearbyStoresClicked
          ? (address !== "" && (
            <iframe
              src={`
                ${mapUrl}
                ?q=grocery+stores+near+${address}
                &center=${latitude},${longitude}
                &zoom=11
                &key=${googleMapsAPIKeyOne}
              `}
              style={{border: "0 none"}}
            ></iframe>
          ))
          : <button onClick={handleShowNearbyStoresClick}>Show Nearby Stores</button>
        }
      </div>
      <hr />

      <span>Growers &amp; Ranchers</span>
      <hr />

      <span>Stores &amp; Butchers</span>
      <hr />

      <span>Popular Now</span>
      <hr />

      <span>Suggested for You</span>
    </div>
  );
}
