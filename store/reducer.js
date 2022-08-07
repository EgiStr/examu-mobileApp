const reducer = (state, action) => {
  let py = action.payload;
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        login: true,
      };

    case 'LOGOUT':
      return {
        ...state,
        login: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'SET_LOADING_FALSE':
      return {
        ...state,
        loading: false,
      };

    case 'SHOW_TOAST':
      return {
        ...state,
        toast: py,
      };
    case 'HIDE_TOAST':
      return {
        ...state,
        toast: py,
      };

    default:
      return state;
  }
};
export default reducer;
