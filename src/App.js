import React, { Component } from 'react';
import Header from './component/Header';
import Main from './component/Main';
import NewUser from './component/NewUser'
import './App.css';

let columnsDefault = [{id: 1, name: 'TODO'},{id: 2, name: 'In Progress'},{id: 3, name: 'Testing'},{id: 4, name: 'Done'}]

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      newUser: false,
      users: [],
      cards: [],
      columns: [],
      actualUser: {},
    }
  }

  componentWillMount(){

    localStorage.getItem('actualUser') === null ? 
      this.setState({ newUser: true }) : 
      this.setState({ newUser: false , actualUser: JSON.parse(localStorage.getItem('actualUser')) })

    if(localStorage.getItem('columns') === null) {
      localStorage.setItem('columns', JSON.stringify(columnsDefault)) 
      this.setState({ columns: JSON.parse(localStorage.getItem('columns')) })
    } else { 
      this.setState({ columns: JSON.parse(localStorage.getItem('columns')) })
    }

    this.setState({ users: JSON.parse(localStorage.getItem('users')) })

    if(localStorage.getItem('cards') === null || localStorage.getItem('cards') === '') { 
      localStorage.setItem('cards', [])
    } else {
      this.setState({ cards: JSON.parse(localStorage.getItem('cards')) })
    }

  }
  Exit = () => {
    this.setState({actualUser: {}, newUser: true})
  }
  updateActualUser = () =>{
    this.setState({ newUser: false, actualUser: JSON.parse(localStorage.getItem('actualUser'))})
  }
  updateUsers =(users) => {
    this.setState({users: users})
  }
  render() {
    let content = null
    this.state.newUser ? content = <NewUser updateUsers={this.updateUsers} updateActualUser={this.updateActualUser}/> : content = null
    return (
      <div className="App">
        <Header exitUser = {this.Exit} name = {this.state.actualUser.name}/>
        {content}
        <Main users={this.state.users} actualUser = {this.state.actualUser} cards={this.state.cards} columns={this.state.columns}/>
      </div>
    );
  }
}

export default App;
