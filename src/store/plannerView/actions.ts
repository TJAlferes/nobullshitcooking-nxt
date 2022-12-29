import { actionTypes, IPlannerViewData } from './types';

const { PLANNER_VIEW_CLICK_DAY, PLANNER_VIEW_LOAD } = actionTypes;

export const plannerViewClickDay = (day: number) => ({type: PLANNER_VIEW_CLICK_DAY, day});

export const plannerViewLoad = (planName: string, planData: IPlannerViewData) =>
  ({type: PLANNER_VIEW_LOAD, planName, planData});