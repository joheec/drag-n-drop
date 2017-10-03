const initialState = {
  nextId: 0,
  urls: [],
};

export default (state=initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_URL':
      return {
        nextId: state.nextId + 1,
        urls: [
          ...state.urls,
          {
            id: state.nextId,
            url: payload.url
          }
        ],
      }
    default:
      return state;
  }
};
