import { actionTypes, IState, Actions } from './types';

const { LATITUDE, LONGITUDE, ADDRESS, NEARBY_STORES_CLICKED } = actionTypes;

const initialState: IState = {latitude: "", longitude: "", address: "", nearbyStoresClicked: false};

export const geolocationReducer = (state = initialState, action: Actions): IState => {
  switch (action.type) {
    case LATITUDE:              return {...state, latitude: action.latitude};
    case LONGITUDE:             return {...state, longitude: action.longitude};
    case ADDRESS:               return {...state, address: action.address};
    case NEARBY_STORES_CLICKED: return {...state, nearbyStoresClicked: action.clicked};
    default:                    return state;
  }
};
