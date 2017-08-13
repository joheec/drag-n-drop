import test from 'ava';
import { canDragAndDrop, hasFormData, hasFileReader, canAdvanceUpload } from './renderer.js';

const div = document.createElement('div');

test('canDragAndDrop', t => {
  t.true(canDragAndDrop(div));
});

test('hasFormData', t => {
  t.true(hasFormData(window));
});

test('hasFileReader', t => {
  t.true(hasFileReader(window));
});

test('canAdvanceUpload', t => {
  t.true(canAdvanceUpload(div, window));
});
