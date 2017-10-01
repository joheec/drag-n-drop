import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Form } from './form';
import * as fileActions from './actions';

const App = ({ actions, files }) => {
  return <Form 
    addFile={ actions.addFile }
    files={ files }
  />
}

const mapStateToProps = state => ({
  files: state.files
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(fileActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
