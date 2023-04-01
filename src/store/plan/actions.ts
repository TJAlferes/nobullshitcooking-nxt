import { PlanData } from '../new-plan/types';
import { actionTypes } from './types';

const { CLICK_DAY, LOAD } = actionTypes;

export const clickDay = (day: number) => ({type: CLICK_DAY, day});

export const load = (planName: string, planData: PlanData) => ({type: LOAD, planName, planData});
