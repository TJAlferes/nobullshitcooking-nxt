import axios from 'axios';
import { useState } from 'react';

export function Suggestions() {
  const [ latitude, setLatitude ] = useState("");
  const [ longitude, setLongitude ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ nearbyStoresClicked, setNearbyStoresClicked ] = useState(false);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLatitude(`${position.coords.latitude}`);
      setLongitude(`${position.coords.longitude}`);
    });
    if (latitude === "" || longitude === "") return;
    const res = await axios.get(
      `${geoUrl}?latlng=${latitude},${longitude}&key=${googleMapsAPIKeyTwo}`
    );
    setAddress(res.data.results[3].formatted_address);
  };

  const showNearbyStores = () => {
    setNearbyStoresClicked(true);
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
          : <button onClick={showNearbyStores}>Show Nearby Stores</button>
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

const googleMapsAPIKeyOne = 'AIzaSyCULKDLxoF9O413jjvF5Ot2xXXMdgz0Eag';  // renew
const googleMapsAPIKeyTwo = 'AIzaSyA1caERqL2MD4rv2YmbJ139ToyxgT61v6w';
const geoUrl              = 'https://maps.googleapis.com/maps/api/geocode/json';
const mapUrl              = 'https://www.google.com/maps/embed/v1/search';
