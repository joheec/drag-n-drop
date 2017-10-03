import React from 'react';
import glamorous from 'glamorous';

export default  ({ status }) => {
  switch(status) {
    case 'uploading':
      return <StatusStrong>Uploading&hellip;</StatusStrong>;
    case 'upload-error':
      return <StatusStrong>Error :(</StatusStrong>;
    default:
      return null;
  }
}

const StatusStrong = glamorous.strong({
  fontSize: '18px',
});
