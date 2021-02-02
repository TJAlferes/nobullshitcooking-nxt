import { geolocationReducer } from '../../../src/store/geolocation/reducer';
import { actionTypes } from '../../../src/store/geolocation/types';

const {
  GEO_LATITUDE,
  GEO_LONGITUDE,
  GEO_ADDRESS,
  GEO_NEARBY_STORES_CLICKED
} = actionTypes;

const initialState = {
  latitude: "",
  longitude: "",
  address: "",
  nearbyStoresClicked: false
};

describe('geolocation reducer', () => {
  it('returns initial state', () => {
    expect(geolocationReducer(undefined, {type: GEO_ADDRESS, address: ""}))
      .toEqual(initialState);
  });

  it('handles actions of type GEO_ADDRESS', () => {
    expect(geolocationReducer(initialState, {
      type: GEO_ADDRESS,
      address: "123 Fun Street"
    }))
      .toEqual({
        latitude: "",
        longitude: "",
        address: "123 Fun Street",
        nearbyStoresClicked: false
      });
  });

  it('handles actions of type GEO_LATITUDE', () => {
    expect(geolocationReducer(initialState, {
      type: GEO_LATITUDE,
      latitude: "43.21"
    }))
      .toEqual({
        latitude: "43.21",
        longitude: "",
        address: "",
        nearbyStoresClicked: false
      });
  });

  it('handles actions of type GEO_LONGITUDE', () => {
    expect(geolocationReducer(initialState, {
      type: GEO_LONGITUDE,
      longitude: "87.65"
    }))
      .toEqual({
        latitude: "",
        longitude: "87.65",
        address: "",
        nearbyStoresClicked: false
      });
  });

  it('handles actions of type GEO_NEARBY_STORES_CLICKED', () => {
    expect(geolocationReducer(initialState, {
      type: GEO_NEARBY_STORES_CLICKED,
      clicked: true
    }))
      .toEqual({
        latitude: "",
        longitude: "",
        address: "",
        nearbyStoresClicked: true
      });
  });
});