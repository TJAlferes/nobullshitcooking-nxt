import { actionTypes, State, Actions } from './types';

const { LATITUDE, LONGITUDE, ADDRESS, NEARBY_STORES_CLICKED } = actionTypes;

const initialState: State = {
  latitude:            "",
  longitude:           "",
  address:             "",
  nearbyStoresClicked: false
};

export const geolocationReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case LATITUDE:              return {...state, latitude: action.latitude};
    case LONGITUDE:             return {...state, longitude: action.longitude};
    case ADDRESS:               return {...state, address: action.address};
    case NEARBY_STORES_CLICKED: return {...state, nearbyStoresClicked: action.clicked};
    default:                    return state;
  }
};
