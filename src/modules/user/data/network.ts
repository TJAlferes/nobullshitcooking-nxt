import axios from 'axios';

import { endpoint } from '../../../config/api';
import { setItem }  from '../../general/localStorage';
import type { UserData } from './state';
import type { Ownership } from '../../shared/types';

// move to an api.ts ???
// TO DO: move to store useUserDataFetcher
// useDataFetcher

export async function getInitialUserData() {
  try {
    const { data } = await axios.post(
      `${endpoint}/user/initial-data`,
      {},
      {withCredentials: true}
    );
    for (const [ key, value ] of Object.entries(data)) {
      setItem(key, value);
    }
  } catch (err: any) {
    if (err.response) {
      // Server responded with a status code outside of 2xx
      console.log(err.response.status, err.response.data, err.response.headers);
    } else if (err.request) {
      // No response was received -- `err.request` is:
      // an instance of XMLHttpRequest in the browser,
      // an instance of http.ClientRequest in node.js
      console.log(err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', err.message);
    }
    console.log(err.config);
  }
}

// refetches

export const getMyFriendships        = createUserDataFetcher(`/users/${authname}/friendships`,         "my_friendships");
export const getMyPrivateEquipment   = createUserDataFetcher(`/users/${authname}/private-equipment`,   "my_private_equipment");
export const getMyPrivateIngredients = createUserDataFetcher(`/users/${authname}/private-ingredients`, "my_private_ingredients");
export const getMyFavoriteRecipes    = createUserDataFetcher(`/users/${authname}/favorite-recipes`,    "my_favorite_recipes");
export const getMySavedRecipes       = createUserDataFetcher(`/users/${authname}/saved-recipes`,       "my_saved_recipes");

export const getMyPlans = (ownership: Ownership) => {
  if (ownership == 'official') return;
  return createUserDataFetcher(`/user/${ownership}/plan`, `my_${ownership}_plans`);
};

export const getMyRecipes = (ownership: Ownership) => {
  if (ownership == 'official') return;
  return createUserDataFetcher(`/user/${ownership}/recipe`, `my_${ownership}_recipes`);
};

function createUserDataFetcher(path: string, key: keyof UserData) {
  return async function () {
    try {
      const { data } = await axios.post(
        `${endpoint}${path}`,
        {},
        {withCredentials: true}
      );
      setItem(key, data);
    } catch (err) {}
  }
}
