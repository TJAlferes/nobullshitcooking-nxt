import { actionTypes, IInitialData, IInitialUserData } from './types';

const { INIT, GET_INITIAL_DATA, GET_DATA, GET_INITIAL_USER_DATA, GET_USER_DATA } = actionTypes;

export const init = () => ({type: INIT});

export const getInitialData = (initialData: IInitialData) =>                             ({type: GET_INITIAL_DATA, initialData});
export const getData =        (key: keyof IInitialData, value: Partial<IInitialData>) => ({type: GET_DATA, data: {key, value}});

export const getInitialUserData = (initialUserData: IInitialUserData) =>                             ({type: GET_INITIAL_USER_DATA, initialUserData});
export const getUserData =        (key: keyof IInitialUserData, value: Partial<IInitialUserData>) => ({type: GET_USER_DATA, data: {key, value}});