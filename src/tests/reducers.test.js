import test from 'ava';
import fileReducer from '../app/reducers';

test('Uploaded files reducer', (t) => {
  const initialState = {
    files: [],
  };

  const actions = [
    {
      type: 'ADD_FILE', 
      payload: {
        files: [
          {fileObject1: 'fileObject1'},
          {fileObject2: 'fileObject2'}
        ]
      }
    },
    {
      type: 'ADD_FILE', 
      payload: {
        files: [{fileObject3: 'fileObject3'}]
      }
    }
  ];

  const newState = actions.reduce(fileReducer, undefined);

  t.deepEqual(newState, {
    files: [
      {fileObject1: 'fileObject1'},
      {fileObject2: 'fileObject2'},
      {fileObject3: 'fileObject3'},
    ],
  });
});
