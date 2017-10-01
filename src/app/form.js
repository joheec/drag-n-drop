import React from 'react';
import ReactDom from 'react-dom';
import { css } from 'glamor';
import glamorous from 'glamorous';
import FormStatus from './form-status';

export class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      className: 'not-dragging',
      status: 'pending',
    }

    this._onDragEvents = this._onDragEvents.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);
    this._onDrop = this._onDrop.bind(this);
  }

  componentDidMount() {
    if (!canAdvanceUpload(document.createElement("div"), window)) return;
    const form = document.querySelector("form");
    const dragEvents = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'];
    dragEvents.forEach(drag => {
      window.addEventListener(drag, this._onDragEvents);
    });
    const dragOverEvents = ['dragover', 'dragenter'];
    dragOverEvents.forEach(drag => {
      form.addEventListener(drag, this._onDragOver);
    });
    const dragEndEvents = ['dragend', 'dragleave', 'drop'];
    dragEndEvents.forEach(drag => {
      form.addEventListener(drag, this._onDragEnd);
    });
    form.addEventListener('drop', this._onDrop);
  }

  componentWillUnmount() {
    if (!canAdvanceUpload(document.createElement("div"), window)) return;
    const form = document.querySelector("form");
    const dragEvents = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'];
    dragEvents.forEach(drag => {
      window.removeEventListener(drag, this._onDragEvents);
    });
    const dragOverEvents = ['dragover', 'dragenter'];
    dragOverEvents.forEach(drag => {
      form.removeEventListener(drag, this._onDragOver);
    });
    const dragEndEvents = ['dragend', 'dragleave', 'drop'];
    dragEndEvents.forEach(drag => {
      form.removeEventListener(drag, this._onDragEnd);
    });
    form.removeEventListener('drop', this._onDrop);
  }

  render() {
    return <FormStyle className={ this.state.className }>
      <HideInput type="file" id="manual-upload" multiple />
      <label htmlFor="manual-upload">
        <ManualUpload>Choose a file</ManualUpload>
      </label>
      { canAdvanceUpload(document.createElement('div'), window) && <span className='upload-drag'> or drag it here</span> }.
      <FormStatus status={ this.state.status }/>
      <FileUl>
        { this.props.files.map(({file, id}) => <li key={ id }>{ file }</li>) }
      </FileUl>
    </FormStyle>
  }

  _onDragEvents(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  _onDragOver(e) {
    this.setState({className: 'dragging',});
  }
  
  _onDragEnd(e) {
    this.setState({className: 'not-dragging',});
  }

  _onDrop(e) {
    this.setState({className: 'not-dragging', status: 'uploading'});
    Array.from(e.dataTransfer.files).forEach(({ path }) => this.props.addFile(path));
  }
}

const mouseoverStyle = css({
  color: 'mediumvioletred',
  backgroundColor: 'aliceblue',
  outlineColor: 'lightpink',
});

const FormStyle = glamorous.form({
  width: '75%',
  height: '1%',
  margin: 'auto',
  padding: '50px',
  color: 'rebeccapurple',
  fontSize: '22px',
  textAlign: 'center',
  backgroundColor: 'paleturquoise',
  outline: '2px dashed',
  outlineColor: 'darkturquoise',
  outlineOffset: '-10px',
  '.dragging': mouseoverStyle,
});

const HideInput = glamorous.input({
  width: '0.1px',
  height: '0.1px',
  opacity: '0',
  overflow: 'hidden',
  position: 'absolute',
  zIndex: '-1',
});

const ManualUpload = glamorous.strong({
  cursor: 'pointer',
});

const FileUl = glamorous.ul({
  fontSize: '16px',
  textAlign: 'left',
  color: '#000000',
});

export const canDragAndDrop = (div) => (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div));
export const hasFormData = window => ('FormData' in window); 
export const hasFileReader = (window) => ('FileReader' in window); 
export const canAdvanceUpload = (div, window) => (canDragAndDrop(div) && hasFormData(window) && hasFileReader(window));

