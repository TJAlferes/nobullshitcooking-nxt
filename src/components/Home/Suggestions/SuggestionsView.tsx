const googleMapsAPIKeyOne = 'AIzaSyCULKDLxoF9O413jjvF5Ot2xXXMdgz0Eag';
const url = 'https://www.google.com/maps/embed/v1/search';

export function SuggestionsView({ address, latitude, longitude, handleShowNearbyStoresClick, nearbyStoresClicked, theme }: Props): JSX.Element {
  return (
    <div className={`suggestions ${theme}`}>
      <span>Stores near you</span>
      <div className="nearby-stores">
        {nearbyStoresClicked
          ? ((address !== "") &&
            <iframe
              style={{border: "0 none"}}
              src={`${url}?q=grocery+stores+near+${address}&center=${latitude},${longitude}&zoom=11&key=${googleMapsAPIKeyOne}`}
            ></iframe>
          )
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

type Props = {
  address: string;
  latitude: string;
  longitude: string;
  handleShowNearbyStoresClick(): void;
  nearbyStoresClicked: boolean;
  theme: string;
};