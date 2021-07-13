const initialState = {
  LOADING: [],
};

const Loading = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      let s = [...state.LOADING];
      if (action.payload) {
        s.push(true);
      } else {
        s.pop();
      }
      return {
        ...state,
        LOADING: s,
      };
    default:
      return state;
  }
};

export default Loading;
