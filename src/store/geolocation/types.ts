export const actionTypes = {
  LATITUDE:              'LATITUDE',
  LONGITUDE:             'LONGITUDE',
  ADDRESS:               'ADDRESS',
  NEARBY_STORES_CLICKED: 'NEARBY_STORES_CLICKED'
} as const;

export type State = {
  latitude:            string;
  longitude:           string;
  address:             string;
  nearbyStoresClicked: boolean;
};

export type Actions =
  | Latitude
  | Longitude
  | Address
  | NearbyStoresClicked;

type Latitude = {
  type:     typeof actionTypes.LATITUDE;
  latitude: string;
};

type Longitude = {
  type:      typeof actionTypes.LONGITUDE;
  longitude: string;
};

type Address = {
  type:    typeof actionTypes.ADDRESS;
  address: string;
};

type NearbyStoresClicked = {
  type:    typeof actionTypes.NEARBY_STORES_CLICKED;
  clicked: boolean;
};
