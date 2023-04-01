import { actionTypes } from './types';

const { LATITUDE, LONGITUDE, ADDRESS, NEARBY_STORES_CLICKED } = actionTypes;

export const geoLatitude =  (latitude: string) =>  ({type: LATITUDE, latitude});
export const geoLongitude = (longitude: string) => ({type: LONGITUDE, longitude});
export const geoAddress =   (address: string) =>   ({type: ADDRESS, address});

export const geoNearbyStoresClicked = (clicked: boolean) => ({type: NEARBY_STORES_CLICKED, clicked});
