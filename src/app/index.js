import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from './form';
import * as urlActions from './actions';

const App = ({ actions, urls }) => {
  return <Form 
    addUrl={ actions.addUrl }
    urls={ urls }
  />
}

const mapStateToProps = state => ({
  urls: state.urls
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(urlActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
