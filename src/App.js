import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './component/Header';
import Main from './component/Main';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header name={this.props.actualUser.name} />
        <Main actualUser={this.props.actualUser} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  actualUser: state.actualUser.actualUser,
});
export default connect(mapStateToProps)(App);
App.propTypes = {
  actualUser: PropTypes.object.isRequired,
};
