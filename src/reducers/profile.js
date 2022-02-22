import { FETCH_USER_PROFILE, USER_PROFILE_SUCCESS } from '../actions/actionTypes';
import { USER_PROFILE_FAILURE } from '../actions/profile';
const initialProfileState = {
    user: {},
    error: null,
    success: null,
    inProgress: false
}
export default function profileosts(state = [], action) {
  switch (action.type) {
    case USER_PROFILE_SUCCESS:
      return {
          ...state,
          success: true,
          user: action.user,
          inProgress: false
      }
    case USER_PROFILE_FAILURE :
        return {
            ...state,
            error: action.error,
            inProgress: false
        }
    case FETCH_USER_PROFILE:
        return {
            ...state,
            inProgress: true
        }
    default:
      return state;
  }
}
