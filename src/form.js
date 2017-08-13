import React from 'react';
import ReactDom from 'react-dom';
import { css } from 'glamor';
import glamorous from 'glamorous';

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
  ':hover':{
    color: 'mediumvioletred',
    backgroundColor: 'aliceblue',
    outlineColor: 'lightpink',
  },
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

export const App = () => (
    <FormStyle>
      <form className='upload' method='post' action='' encType='multipart/form-data'>
        <div className='upload-input' {...css({textAlign: 'center'})}>
          <HideInput className='upload-file' type='file' name='files[]' id='file' data-multiple-caption='{count} files selected' multiple />
          <label htmlFor='file'><strong {...css({cursor: 'pointer'})}>Choose a file</strong><span className='upload-drag'> or drag it here</span>.</label>
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

export const canDragAndDrop = (div) => (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div));
export const hasFormData = window => ('FormData' in window); 
export const hasFileReader = (window) => ('FileReader' in window); 
export const canAdvanceUpload = (div, window) => (canDragAndDrop(div) && hasFormData(window) && hasFileReader(window));

const setupAdvanceUpload = () => {
  const div = document.createElement('div');
  if (!canAdvanceUpload(div, window)) return;
}
