

export const createPublicPlan = (planInfo: PublicPlanInfo) =>
  ({type: CREATE_PUBLIC_PLAN, planInfo});

export const updatePublicPlan = (planInfo: PublicPlanUpdateInfo) =>
  ({type: UPDATE_PUBLIC_PLAN, planInfo});

export const deletePublicPlan = (plan_id: string) =>
  ({type: DELETE_PUBLIC_PLAN, plan_id});



export const actionTypes = {
  CREATE_PUBLIC_PLAN: 'CREATE_PUBLIC_PLAN',
  UPDATE_PUBLIC_PLAN: 'UPDATE_PUBLIC_PLAN',
  DELETE_PUBLIC_PLAN: 'DELETE_PUBLIC_PLAN'
} as const;

const { CREATE_PUBLIC_PLAN, UPDATE_PUBLIC_PLAN, DELETE_PUBLIC_PLAN } = actionTypes;

export type CreatePublicPlan = {
  type:     typeof actionTypes.CREATE_PUBLIC_PLAN;
  planInfo: PublicPlanInfo;
};

export type UpdatePublicPlan = {
  type:     typeof actionTypes.UPDATE_PUBLIC_PLAN;
  planInfo: PublicPlanUpdateInfo;
};

export type DeletePublicPlan = {
  type:    typeof actionTypes.DELETE_PUBLIC_PLAN;
  plan_id: string;
};

// TO DO: move shared types to one location

export type PublicPlanInfo = {
  plan_name: string;
  plan_data: string;  // TO DO: change/finish
};

export type PublicPlanUpdateInfo = PublicPlanInfo & {
  plan_id: string;
};
