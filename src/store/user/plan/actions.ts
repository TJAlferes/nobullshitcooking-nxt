import { actionTypes, IPlanInfo, IPlanUpdateInfo } from './types';

const { CREATE_PLAN, UPDATE_PLAN, DELETE_PLAN } = actionTypes;

export const createPlan = (planInfo: IPlanInfo) =>       ({type: CREATE_PLAN, planInfo});
export const updatePlan = (planInfo: IPlanUpdateInfo) => ({type: UPDATE_PLAN, planInfo});
export const deletePlan = (id: number) =>                ({type: DELETE_PLAN, id});