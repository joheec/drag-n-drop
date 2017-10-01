import { test } from 'ava';
import { addFile } from '../app/actions';

test('Test reducer action creator', t => {
  const files = [
    {file1: 'file1'},
    {file2: 'file2'}
  ];

  t.deepEqual(addFile(files), {
    type: 'ADD_FILE',
    payload: [...files]
  });
});
