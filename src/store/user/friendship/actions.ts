import { actionTypes } from './types';

const { REQUEST_FRIENDSHIP, ACCEPT_FRIENDSHIP, REJECT_FRIENDSHIP, DELETE_FRIENDSHIP, BLOCK_USER, UNBLOCK_USER } = actionTypes;

export const requestFriendship = (friend: string) => ({type: REQUEST_FRIENDSHIP, friend});
export const acceptFriendship =  (friend: string) => ({type: ACCEPT_FRIENDSHIP, friend});  // status
export const rejectFriendship =  (friend: string) => ({type: REJECT_FRIENDSHIP, friend});
export const deleteFriendship =  (friend: string) => ({type: DELETE_FRIENDSHIP, friend});

export const blockUser =   (friend: string) => ({type: BLOCK_USER, friend});
export const unblockUser = (friend: string) => ({type: UNBLOCK_USER, friend});
