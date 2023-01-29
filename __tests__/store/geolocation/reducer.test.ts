import { geolocationReducer } from '../../../src/store/geolocation/reducer';
import { actionTypes } from '../../../src/store/geolocation/types';

const {
  LATITUDE,
  LONGITUDE,
  ADDRESS,
  NEARBY_STORES_CLICKED
} = actionTypes;

const initialState = {
  latitude:  "",
  longitude: "",
  address:   "",
  nearbyStoresClicked: false
};

describe('geolocation reducer', () => {
  it('returns initial state', () => {
    expect(geolocationReducer(undefined, {type: ADDRESS, address: ""})).toEqual(initialState);
  });

  it('handles actions of type ADDRESS', () => {
    const reducer = geolocationReducer(initialState, {type: ADDRESS, address: "123 Fun Street"});
    expect(reducer.address).toEqual("123 Fun Street");
  });

  it('handles actions of type LATITUDE', () => {
    const reducer = geolocationReducer(initialState, {type: LATITUDE, latitude: "43.21"});
    expect(reducer.latitude).toEqual("43.21");
  });

  it('handles actions of type LONGITUDE', () => {
    const reducer = geolocationReducer(initialState, {type: LONGITUDE, longitude: "87.65"});
    expect(reducer.longitude).toEqual("87.65");
  });

  it('handles actions of type NEARBY_STORES_CLICKED', () => {
    const reducer = geolocationReducer(initialState, {type: NEARBY_STORES_CLICKED, clicked: true});
    expect(reducer).toEqual(true);
  });
});