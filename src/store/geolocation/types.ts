export const actionTypes = {
  GEO_LATITUDE: 'GEO_LATITUDE',
  GEO_LONGITUDE: 'GEO_LONGITUDE',
  GEO_ADDRESS: 'GEO_ADDRESS',
  GEO_NEARBY_STORES_CLICKED: 'GEO_NEARBY_STORES_CLICKED'
} as const;

/*

State

*/

export interface IGeoState {
  latitude: string;
  longitude: string;
  address: string;
  nearbyStoresClicked: boolean;
}

/*

Actions

*/

export type GeoActions =
IGeoAddress |
IGeoLatitude |
IGeoLongitude |
IGeoNearbyStoresClicked;

interface IGeoAddress {
  type: typeof actionTypes.GEO_ADDRESS;
  address: string;
}

interface IGeoLatitude {
  type: typeof actionTypes.GEO_LATITUDE;
  latitude: string;
}

interface IGeoLongitude {
  type: typeof actionTypes.GEO_LONGITUDE;
  longitude: string;
}

interface IGeoNearbyStoresClicked {
  type: typeof actionTypes.GEO_NEARBY_STORES_CLICKED;
  clicked: boolean;
}