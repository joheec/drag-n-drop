import React from 'react';
import ReactDom from 'react-dom';
import { css } from 'glamor';
import glamorous from 'glamorous';

export const canDragAndDrop = (div) => (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div));
export const hasFormData = window => ('FormData' in window); 
export const hasFileReader = (window) => ('FileReader' in window); 
export const canAdvanceUpload = (div, window) => (canDragAndDrop(div) && hasFormData(window) && hasFileReader(window));

let droppedFiles = [];

export const setupAdvanceUpload = () => {
  const div = document.createElement('div');
  if (!canAdvanceUpload(div, window)) return;
  const screen = document.getElementsByTagName('html')[0];
  const dragEvents = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'];
  dragEvents.forEach(drag => {
    screen.addEventListener(drag, e => {
      e.preventDefault();
      e.stopPropagation();
    });
  });
  const form = document.querySelector('#app div');
  const dragOverEvents = ['dragover', 'dragenter'];
  dragOverEvents.forEach(drag => {
    form.addEventListener(drag, e => {
      form.classList.add('drag-over');
    });
  });
  const dragEndEvents = ['dragend', 'dragleave', 'drop'];
  dragEndEvents.forEach(drag => {
    form.addEventListener(drag, e => {
      form.classList.remove('drag-over');
    });
  });
  form.addEventListener('drop', e => {
    Array.from(e.dataTransfer.files).forEach(file => {
      droppedFiles.push(file);
    });
    console.log(droppedFiles);
  });
}

export const Form = () => (
  <FormStyle>
    <form className='upload' method='post' action='' encType='multipart/form-data'>
      <div className='upload-input' {...css({textAlign: 'center'})}>
        <HideInput className='upload-file' type='file' name='files[]' id='file' data-multiple-caption='{count} files selected' multiple />
        <label htmlFor='file'>
          <strong {...css({cursor: 'pointer'})}>Choose a file</strong>
          {canAdvanceUpload(document.createElement('div'), window) && <span className='upload-drag'> or drag it here</span>}.
        </label>
        <button className='upload-button' type='submit'>Upload</button>
      </div>
      <StatusStyle className='status-files'> Selected files: </StatusStyle>
      <StatusStyle className='status-uploading'>Uploading&hellip;</StatusStyle>
      <StatusStyle className='status-success'>Done :)</StatusStyle>
      <StatusStyle className='status-error'>Error :(</StatusStyle>
    </form>
    <br />
  </FormStyle>
);

const mouseoverStyle = css({
  color: 'mediumvioletred',
  backgroundColor: 'aliceblue',
  outlineColor: 'lightpink',
});

const FormStyle = glamorous.div({
  width: '75\%',
  height: '1\%',
  margin: 'auto',
  padding: '50px',
  color: 'rebeccapurple',
  backgroundColor: 'paleturquoise',
  outline: '2px dashed',
  outlineColor: 'darkturquoise',
  outlineOffset: '-10px',
  ':hover': mouseoverStyle,
  '.drag-over': mouseoverStyle,
});

const StatusStyle = glamorous.div({
  display: 'none',
});

const HideInput = glamorous.input({
  width: '0.1px',
  height: '0.1px',
  opacity: '0',
  overflow: 'hidden',
  position: 'absolute',
  zIndex: '-1',
});

