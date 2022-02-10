import { APIUrls } from '../helpers/urls';
import { LOGIN_START, LOGIN_FAILURE, LOGIN_SUCCESS} from './actionTypes';
import { getFormBody } from '../helpers/utils';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILURE,
    error: errorMessage
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}



export function login(email, password) {
  return (dispatch) => {
      dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www/form-urlencoded',
      },
      body: getFormBody({email, password}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('data', data);
      if(data.success) {
        dispatch(loginSuccess(data.data.user));

      }
      else {
        dispatch(loginFailed(data.message))
      }
      

    })
  };
}
