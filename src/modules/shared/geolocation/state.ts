

const initialState: State = {
  latitude:            "",
  longitude:           "",
  address:             "",
  nearbyStoresClicked: false
};

export const geolocationReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case LATITUDE:
      return {...state, latitude: action.latitude};
    case LONGITUDE:
      return {...state, longitude: action.longitude};
    case ADDRESS:
      return {...state, address: action.address};
    case NEARBY_STORES_CLICKED:
      return {...state, nearbyStoresClicked: action.clicked};
    default: return state;
  }
};



export const geoLatitude = (latitude: string) => ({type: LATITUDE, latitude});

export const geoLongitude = (longitude: string) => ({type: LONGITUDE, longitude});

export const geoAddress = (address: string) => ({type: ADDRESS, address});

export const geoNearbyStoresClicked = (clicked: boolean) => ({type: NEARBY_STORES_CLICKED, clicked});



export const actionTypes = {
  LATITUDE:              'LATITUDE',
  LONGITUDE:             'LONGITUDE',
  ADDRESS:               'ADDRESS',
  NEARBY_STORES_CLICKED: 'NEARBY_STORES_CLICKED'
} as const;

const { LATITUDE, LONGITUDE, ADDRESS, NEARBY_STORES_CLICKED } = actionTypes;

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
