const initialState = {
  nextId: 0,
  files: [],
};

export default (state=initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_FILE':
      return {
        nextId: state.nextId + 1,
        files: [
          ...state.files,
          {
            id: state.nextId,
            file: payload.file
          }
        ],
      }
    default:
      return state;
  }
};
