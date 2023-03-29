import { actionTypes, PlanInfo, PlanUpdateInfo } from './types';

const { CREATE_PLAN, UPDATE_PLAN, DELETE_PLAN } = actionTypes;

export const createPlan = (planInfo: PlanInfo) =>       ({type: CREATE_PLAN, planInfo});
export const updatePlan = (planInfo: PlanUpdateInfo) => ({type: UPDATE_PLAN, planInfo});
export const deletePlan = (id: number) =>               ({type: DELETE_PLAN, id});
