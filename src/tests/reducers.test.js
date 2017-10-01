import test from 'ava';
import fileReducer from '../app/reducers';

test('Uploaded files reducer', (t) => {
  const initialState = {
    nextId: 0,
    files: [],
  };

  const actions = [
    {
      type: 'ADD_FILE', 
      payload: {
        file: 'fileObject1',
      }
    },
    {
      type: 'ADD_FILE', 
      payload: {
        file: 'fileObject2',
      }
    },
    {
      type: 'ADD_FILE', 
      payload: {
        file: 'fileObject3',
      }
    }
  ];

  const newState = actions.reduce(fileReducer, undefined);

  t.deepEqual(newState, {
    nextId: 3,
    files: [
      {
        id: 0,
        file: 'fileObject1'
      },
      {
        id: 1,
        file: 'fileObject2'
      },
      {
        id: 2,
        file: 'fileObject3'
      },
    ],
  });
});
