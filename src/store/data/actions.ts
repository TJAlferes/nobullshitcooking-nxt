import { actionTypes, IInitialData, IInitialUserData } from './types';

const { DATA_INIT, DATA_GET_INITIAL_DATA, DATA_GET_DATA, DATA_GET_INITIAL_USER_DATA, DATA_GET_USER_DATA } = actionTypes;

export const dataInit = () => ({type: DATA_INIT});

export const dataGetInitialData = (initialData: IInitialData) =>                             ({type: DATA_GET_INITIAL_DATA, initialData});
export const dataGetData =        (key: keyof IInitialData, value: Partial<IInitialData>) => ({type: DATA_GET_DATA, data: {key, value}});

export const dataGetInitialUserData = (initialUserData: IInitialUserData) =>                             ({type: DATA_GET_INITIAL_USER_DATA, initialUserData});
export const dataGetUserData =        (key: keyof IInitialUserData, value: Partial<IInitialUserData>) => ({type: DATA_GET_USER_DATA, data: {key, value}});