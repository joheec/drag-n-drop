import { test } from 'ava';
import { addFile } from '../app/actions';

test('Test reducer action creator', t => {
  const file = 'file1';

  t.deepEqual(addFile(file), {
    type: 'ADD_FILE',
    payload: {
      file
    }
  });
});
