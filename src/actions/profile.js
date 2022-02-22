import { APIUrls } from '../helpers/urls';
import { FETCH_USER_PROFILE, USER_PROFILE_SUCCESS } from './actionTypes';
import { getAuthtokenFromLocalStorage } from '../helpers/utils';
export function startUserProfileFetch() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function USER_PROFILE_FAILURE(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}

export function fetchUserProfile(userId) {
  console.log(getAuthtokenFromLocalStorage());
  console.log("$$$$");
  return (dispatch) => {
    dispatch(startUserProfileFetch);
    const url = APIUrls.userProfile(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthtokenFromLocalStorage()}`,
      },
    }).then(response => response.json())
    .then(data => {
        dispatch(userProfileSuccess(data.data.user));
    })
  };
}
