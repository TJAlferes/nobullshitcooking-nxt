import { actionTypes } from './types';

const { USER_REQUEST_FRIENDSHIP, USER_ACCEPT_FRIENDSHIP, USER_REJECT_FRIENDSHIP, USER_DELETE_FRIENDSHIP, USER_BLOCK_USER, USER_UNBLOCK_USER } = actionTypes;

export const userRequestFriendship = (friend: string) =>                 ({type: USER_REQUEST_FRIENDSHIP, friend});
export const userAcceptFriendship =  (friend: string, status: string) => ({type: USER_ACCEPT_FRIENDSHIP, friend, status});
export const userRejectFriendship =  (friend: string) =>                 ({type: USER_REJECT_FRIENDSHIP, friend});
export const userDeleteFriendship =  (friend: string, status: string) => ({type: USER_DELETE_FRIENDSHIP, friend, status});

export const userBlockUser =   (friend: string, status: string) => ({type: USER_BLOCK_USER, friend, status});
export const userUnblockUser = (friend: string) =>                 ({type: USER_UNBLOCK_USER, friend});