// TO DO: split into private and public

export const createPlan = (planInfo: PlanInfo) => ({type: CREATE_PRIVATE_PLAN, planInfo});

export const updatePlan = (planInfo: PlanUpdateInfo) => ({type: UPDATE_PRIVATE_PLAN, planInfo});

export const deletePlan = (plan_id: string) => ({type: DELETE_PRIVATE_PLAN, plan_id});



export const actionTypes = {
  CREATE_PRIVATE_PLAN: 'CREATE_PRIVATE_PLAN',
  UPDATE_PRIVATE_PLAN: 'UPDATE_PRIVATE_PLAN',
  DELETE_PRIVATE_PLAN: 'DELETE_PRIVATE_PLAN'
} as const;

const { CREATE_PRIVATE_PLAN, UPDATE_PRIVATE_PLAN, DELETE_PRIVATE_PLAN } = actionTypes;

export type CreatePlan = {
  type:     typeof actionTypes.CREATE_PRIVATE_PLAN;
  planInfo: PlanInfo;
};

export type UpdatePlan = {
  type:     typeof actionTypes.UPDATE_PRIVATE_PLAN;
  planInfo: PlanUpdateInfo;
};

export type DeletePlan = {
  type:    typeof actionTypes.DELETE_PRIVATE_PLAN;
  plan_id: string;
};

// TO DO: move shared types to one location

export type PlanInfo = {
  plan_name: string;
  plan_data: string;  // TO DO: change/finish
};

export type PlanUpdateInfo = PlanInfo & {
  plan_id: string;
};
