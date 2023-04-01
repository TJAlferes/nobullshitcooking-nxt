import { actionTypes, InitialData, InitialUserData } from './types';

const { INIT, INIT_USER, GET_INITIAL_DATA, GET_DATA, GET_INITIAL_USER_DATA, GET_USER_DATA } = actionTypes;

export const init =     () => ({type: INIT});
export const initUser = () => ({type: INIT_USER});

export const getInitialData = (initialData: InitialData) =>                            ({type: GET_INITIAL_DATA, initialData});
export const getData =        (key: keyof InitialData, value: Partial<InitialData>) => ({type: GET_DATA, data: {key, value}});

export const getInitialUserData = (initialUserData: InitialUserData) =>                            ({type: GET_INITIAL_USER_DATA, initialUserData});
export const getUserData =        (key: keyof InitialUserData, value: Partial<InitialUserData>) => ({type: GET_USER_DATA, data: {key, value}});
