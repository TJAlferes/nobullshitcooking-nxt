import { Ownership } from "../shared/types";

export const createPlan = (ownership: Ownership, plan_upload: PlanUpload) =>
  ({type: CREATE_PLAN, ownership, plan_upload});

export const updatePlan = (ownership: Ownership, plan_update_upload: PlanUpdateUpload) =>
  ({type: UPDATE_PLAN, ownership, plan_update_upload});

export const deletePlan = (ownership: Ownership, plan_id: string) =>
  ({type: DELETE_PLAN, ownership, plan_id});



export const actionTypes = {
  CREATE_PLAN: 'CREATE_PLAN',
  UPDATE_PLAN: 'UPDATE_PLAN',
  DELETE_PLAN: 'DELETE_PLAN'
} as const;

const { CREATE_PLAN, UPDATE_PLAN, DELETE_PLAN } = actionTypes;

export type CreatePlan = {
  type:        typeof actionTypes.CREATE_PLAN;
  ownership:   Ownership
  plan_upload: PlanUpload;
};

export type UpdatePlan = {
  type:               typeof actionTypes.UPDATE_PLAN;
  ownership:          Ownership
  plan_update_upload: PlanUpdateUpload;
};

export type DeletePlan = {
  type:      typeof actionTypes.DELETE_PLAN;
  ownership: Ownership
  plan_id:   string;
};

export type PlanUpload = {
  plan_name: string;
  plan_data: string;  // TO DO: change/finish
};

export type PlanUpdateUpload = PlanUpload & {
  plan_id: string;
};
