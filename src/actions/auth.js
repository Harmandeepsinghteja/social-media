import {
  LOGIN_START,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  AUTHENTICATE_USER,
  LOG_OUT,
  SIGNUP_START,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  CLEAR_AUTH_STATE,
  EDIT_USER_FAILED,
  EDIT_USER_SUCCESSFULL,
} from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getAuthtokenFromLocalStorage, getFormBody } from '../helpers/utils';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILURE,
    error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function login(email, password) {
  return (dispatch) => {
    const body = {
      email: 'harman@gmail.com',
      password: '1234',
    };

    var formBody = [];
    for (var key in body) {
      var encodedKey = encodeURI(key);
      var encodedValue = encodeURI(body[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');
    console.log(formBody);
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((data) => {
       
        if (data.success) {
           localStorage.setItem('token', data.data.token);
          dispatch(loginSuccess(data.data.user));
        } else {
          dispatch(loginFailed(data.message));
        }
      });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}

export function signup(email, password, confirmPassword, name) {
  return (dispatch) => {
    const url = APIUrls.signup();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({
        email,
        password,
        confirm_password: confirmPassword,
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('data', data);
        if (data.success) {
          // do something
          console.log('$$$', data.data.token)
          localStorage.setItem('token', data.data.token);
          dispatch(signupSuccessful(data.data.user));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}

export function startSingup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
}

export function signupSuccessful(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

export function editUserSuccessfull(user) {
  return {
    type: EDIT_USER_SUCCESSFULL,
    user,
  };
}

export function editUserFailed(error) {
  return {
    type: EDIT_USER_SUCCESSFULL,
    error,
  };
}

export function editUser(name, passord, confirmPassword, userId) {
  return (dispatch) => {
    const url = APIUrls.editProfile();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthtokenFromLocalStorage()}`,
      },
      body: getFormBody({
        name,
        passord,
        confirm_password: confirmPassword,
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Editdata', data);
        if (data.success) {
          dispatch(editUserSuccessfull(data.user));
          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
          }
          return;
        }

        dispatch(editUserFailed(data.message));
      });
  };
}
