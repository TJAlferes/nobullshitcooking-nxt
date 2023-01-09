import { actionTypes, ICreatingPlanInfo, IEditingPlanInfo } from './types';

const { CREATE_NEW_PLAN, EDIT_PLAN, DELETE_PLAN } = actionTypes;

export const createNewPlan = (planInfo: ICreatingPlanInfo) => ({type: CREATE_NEW_PLAN, planInfo});
export const editPlan =      (planInfo: IEditingPlanInfo) =>  ({type: EDIT_PLAN, planInfo});
export const deletePlan =    (id: number) =>                  ({type: DELETE_PLAN, id});