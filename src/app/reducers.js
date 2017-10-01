const initialState = {
  files: [],
};

export default (state=initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_FILE':
      return {
        files: [
          ...state.files,
          ...payload.files,
        ],
      }
    default:
      return state;
  }
};
