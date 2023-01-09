import { actionTypes, IData } from './types';

const { CLICK_DAY, LOAD } = actionTypes;

export const clickDay = (day: number) => ({type: CLICK_DAY, day});

export const load = (planName: string, planData: IData) => ({type: LOAD, planName, planData});