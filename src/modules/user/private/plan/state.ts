

export const createPrivatePlan = (planInfo: PrivatePlanInfo) =>
  ({type: CREATE_PRIVATE_PLAN, planInfo});

export const updatePrivatePlan = (planInfo: PrivatePlanUpdateInfo) =>
  ({type: UPDATE_PRIVATE_PLAN, planInfo});

export const deletePrivatePlan = (plan_id: string) =>
  ({type: DELETE_PRIVATE_PLAN, plan_id});



export const actionTypes = {
  CREATE_PRIVATE_PLAN: 'CREATE_PRIVATE_PLAN',
  UPDATE_PRIVATE_PLAN: 'UPDATE_PRIVATE_PLAN',
  DELETE_PRIVATE_PLAN: 'DELETE_PRIVATE_PLAN'
} as const;

const { CREATE_PRIVATE_PLAN, UPDATE_PRIVATE_PLAN, DELETE_PRIVATE_PLAN } = actionTypes;

export type CreatePrivatePlan = {
  type:     typeof actionTypes.CREATE_PRIVATE_PLAN;
  planInfo: PrivatePlanInfo;
};

export type UpdatePrivatePlan = {
  type:     typeof actionTypes.UPDATE_PRIVATE_PLAN;
  planInfo: PrivatePlanUpdateInfo;
};

export type DeletePrivatePlan = {
  type:    typeof actionTypes.DELETE_PRIVATE_PLAN;
  plan_id: string;
};

// TO DO: move shared types to one location

export type PrivatePlanInfo = {
  plan_name: string;
  plan_data: string;  // TO DO: change/finish
};

export type PrivatePlanUpdateInfo = PrivatePlanInfo & {
  plan_id: string;
};
