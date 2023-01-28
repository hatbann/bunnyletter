const initialState = {
  user: {
    isLoggingIn: false,
    data: null,
  },
};

function setUserInfo(userInfo, isLoggingIn) {
  return {
    type: 'GETUSERINFO',
    userInfo,
    isLoggingIn,
  };
}

function logout() {
  sessionStorage.clear();
  return {
    type: 'LOGOUT',
  };
}

function user(state = initialState, action) {
  switch (action.type) {
    case 'GETUSERINFO':
      return {
        ...state,
        user: {
          isLoggingIn: action.isLoggingIn,
          data: action.userInfo,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {
          isLoggingIn: false,
          data: null,
        },
      };
    default:
      return state;
  }
}

export default user;
export { setUserInfo, logout };
