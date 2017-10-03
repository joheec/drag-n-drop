import React from 'react';
import ReactDom from 'react-dom';
import { css } from 'glamor';
import glamorous from 'glamorous';
import Transfer from 'transfer-sh';
import FormStatus from './form-status';

export class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      className: 'not-dragging',
      status: 'pending',
      files: []
    }

    this.uploadFiles = this.uploadFiles.bind(this);

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
      <br/>
      <FileUl>
        { this.props.urls.map(({url, id}) => <li key={ id }>
            <a href={ url } onClick={e => {e.preventDefault(); e.stopPropagation();}}>{ url }</a>
          </li>) }
      </FileUl>
      <FormStatus status={ this.state.status }/>
      <FileUl>
        { this.state.files.map(( path, key) => <li key={ key }>{ path }</li>) }
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
    const files = Array.from(e.dataTransfer.files).map(({ path }) => path);
    this.setState({
      className: 'not-dragging', 
      status: 'uploading',
      files: [
        ...this.state.files,
        ...files,
      ]
    });
    this.uploadFiles(files);
  }

  async uploadFiles(files) {
    const filePromises = files.map(path => {
      new Transfer(path)
        .upload()
        .then(link => { 
          console.dir(link); 
          console.dir(path);
          console.dir(this.state.files);
          this.setState({
            files: [...this.state.files.filter(file => file != path)]
          });
          this.state.files.length ? '' : this.setState({status: 'pending'});
          this.props.addUrl(link);
          return link; 
        })
        .catch(err => { console.dir(err) })
    });
   await Promise.all(filePromises);
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

