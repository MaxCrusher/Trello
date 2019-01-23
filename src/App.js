import React, { Component } from 'react';
import Header from './component/Header';
import Main from './component/Main';
import NewUser from './component/NewUser'
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      newUser: false,
      users: [],
      cards: [],
      columns: [],
      actualUser: '',
    }
  }

  componentWillMount(){
    localStorage.getItem('actualUser') === null ? 
      this.setState({ newUser: true }) : 
      this.setState({ newUser: false , actualUser: localStorage.getItem('actualUser') })
    this.setState({ users: JSON.parse(localStorage.getItem('users')) })
    this.setState({ cards: JSON.parse(localStorage.getItem('cards')) })
    this.setState({ column: JSON.parse(localStorage.getItem('column')) }) 
  }
  Exit = () => {
    this.setState({actualUser: '', newUser: true})
  }
  updateActualUser = () =>{
    this.setState({ newUser: false, actualUser: localStorage.getItem('actualUser')})
  }
  updateUsers =(users) => {
    this.setState({users: users})
  }
  render() {
    let content = null
    this.state.newUser ? content = <NewUser updateUsers={this.updateUsers} updateActualUser={this.updateActualUser}/> : content = null
    return (
      <div className="App">
        <Header exitUser = {this.Exit} name = {this.state.actualUser}/>
        {content}
        <Main user={this.state.users} card={this.state.cards} column={this.state.columns}/>
      </div>
    );
  }
}

export default App;
