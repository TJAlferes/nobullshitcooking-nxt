export const actionTypes = {
  LATITUDE:  'LATITUDE',
  LONGITUDE: 'LONGITUDE',
  ADDRESS:   'ADDRESS',
  NEARBY_STORES_CLICKED: 'NEARBY_STORES_CLICKED'
} as const;

export interface IState {
  latitude:  string;
  longitude: string;
  address:   string;
  nearbyStoresClicked: boolean;
}

export type Actions =
  IAddress |
  ILatitude |
  ILongitude |
  INearbyStoresClicked;

interface IAddress {
  type: typeof actionTypes.ADDRESS;
  address: string;
}

interface ILatitude {
  type: typeof actionTypes.LATITUDE;
  latitude: string;
}

interface ILongitude {
  type: typeof actionTypes.LONGITUDE;
  longitude: string;
}

interface INearbyStoresClicked {
  type: typeof actionTypes.NEARBY_STORES_CLICKED;
  clicked: boolean;
}