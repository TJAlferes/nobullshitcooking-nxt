import {
  geoLatitude,
  geoLongitude,
  geoAddress,
  geoNearbyStoresClicked
} from '../../../src/store/geolocation/actions';
import { actionTypes } from '../../../src/store/geolocation/types';

const {
  LATITUDE,
  LONGITUDE,
  ADDRESS,
  NEARBY_STORES_CLICKED
} = actionTypes;

const latitude =  "48.51";
const longitude = "115.43";
const address =   "123 Pleasant Street, Pleasantville, NP";

describe('geoLatitude action creator', () => {
  it('returns the correct action type', () => {
    expect(geoLatitude(latitude).type).toEqual(LATITUDE);
  });

  it('returns the correct latitude', () => {
    expect(geoLatitude(latitude).latitude).toEqual(latitude);
  });
});

describe('geoLongitude action creator', () => {
  it('returns the correct action type', () => {
    expect(geoLongitude(longitude).type).toEqual(LONGITUDE);
  });

  it('returns the correct longitude', () => {
    expect(geoLongitude(longitude).longitude).toEqual(longitude);
  });
});

describe('geoAddress action creator', () => {
  it('returns the correct action type', () => {
    expect(geoAddress(address).type).toEqual(ADDRESS);
  });

  it('returns the correct address', () => {
    expect(geoAddress(address).address).toEqual(address);
  });
});

describe('geoNearbyStoresClicked action creator', () => {
  it('returns the correct action type', () => {
    expect(geoNearbyStoresClicked(true).type).toEqual(NEARBY_STORES_CLICKED);
  });

  it('returns the correct clicked', () => {
    expect(geoNearbyStoresClicked(true).clicked).toEqual(true);
  });
});