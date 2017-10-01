import React from 'react';
import glamorous from 'glamorous';

export default  ({ status }) => {
  switch(status) {
    case 'uploading':
      return <StatusStrong><br/><br/>Uploading&hellip;</StatusStrong>;
    case 'upload-error':
      return <StatusStrong><br/><br/>Error :(</StatusStrong>;
    default:
      return null;
  }
}

const StatusStrong = glamorous.strong({
  fontSize: '18px',
});
