import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './component/Header';
import Main from './component/Main';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: false,
      users: [],
      cards: [],
      columns: [],
      comments: [],
      actualUser: {},
      CardsForCol: [[], [], [], []],
    };
  }

  render() {
    return (
      <div className="App">
        <Header exitUser={this.exit} name={this.state.actualUser.name} />
        <Main actualUser={this.state.actualUser} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state, 'maptoprops');
  return {
    users: state.users.users,
    actualUser: state.actualUser.actualUser,
  };
};
export default connect(mapStateToProps)(App);
