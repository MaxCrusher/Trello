import React, { Component } from 'react';
import Header from './component/Header';
import Main from './component/Main';
import NewUser from './component/NewUser';
import './App.css';

const columnsDefault = [
  { id: 1, name: 'TODO' },
  { id: 2, name: 'In Progress' },
  { id: 3, name: 'Testing' },
  { id: 4, name: 'Done' },
];

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
      maxId: null,
    };
    if (localStorage.getItem('actualUser') === null) {
      this.setState({ newUser: true });
    } else {
      this.setState({ newUser: false, actualUser: JSON.parse(localStorage.getItem('actualUser')) });
    }

    if (localStorage.getItem('columns') === null) {
      localStorage.setItem('columns', JSON.stringify(columnsDefault));
      this.setState({ columns: JSON.parse(localStorage.getItem('columns')) });
    } else {
      this.setState({ columns: JSON.parse(localStorage.getItem('columns')) });
    }

    this.setState({ users: JSON.parse(localStorage.getItem('users')) });

    if (!localStorage.getItem('cards')) {
      localStorage.setItem('cards', []);
    } else {
      this.setState({ cards: JSON.parse(localStorage.getItem('cards')) }, () => {
        const CardsForColLocal = [];
        CardsForColLocal.push(this.sortInCardsForCol(1, this.state.cards));
        CardsForColLocal.push(this.sortInCardsForCol(2, this.state.cards));
        CardsForColLocal.push(this.sortInCardsForCol(3, this.state.cards));
        CardsForColLocal.push(this.sortInCardsForCol(4, this.state.cards));
        this.setState(
          {
            CardsForCol: CardsForColLocal,
          },
          this.maxId(this.state.cards),
        );
      });
    }
  }

  sortInCardsForCol = (id, cards) => {
    const cardsLocal = { ...cards }.filter(elem => elem.colId === id);
    return cardsLocal;
  };

  maxId = masInState => {
    this.setState({ maxId: masInState[masInState.length - 1].id });
  };

  updateCardsForCol = cardsArg => {
    const CardsForColLocal = [];
    this.setState({ cards: cardsArg }, () => {
      CardsForColLocal.push(this.sort(1, this.state.cards));
      CardsForColLocal.push(this.sort(2, this.state.cards));
      CardsForColLocal.push(this.sort(3, this.state.cards));
      CardsForColLocal.push(this.sort(4, this.state.cards));

      this.setState({ CardsForCol: CardsForColLocal }, () => {
        this.maxId(this.state.cards);
      });
    });
  };

  Exit = () => {
    this.setState({
      actualUser: {},
      newUser: true,
    });
  };

  // users

  updateActualUser = userArg => {
    localStorage.setItem('actualUser', JSON.stringify(userArg));
    this.setState({ newUser: false, actualUser: JSON.parse(userArg) });
  };

  addUsers = nameArg => {
    let newUser = true;
    this.state.users.forEach(elem => {
      if (elem.name === nameArg) {
        newUser = false;
      }
    });
    if (newUser) {
      // addUser and updateActualUser
      const user = {
        id: this.maxId(this.state.users) + 1,
        name: nameArg,
      };
      const usersLocal = { ...this.state.users, user };
      localStorage.setItem('users', JSON.stringify(usersLocal));
      this.setState({ users: usersLocal }, () => {
        this.updateActualUser(user);
      });
    } else {
      const user = { ...this.state.users }.filter(elem => elem.name === nameArg);
      this.updateActualUser(user);
    }
  };

  // ______________________________________________________________________________________________

  // cards

  updateCardsAll = card => {
    const { cards } = { ...this.state };
    cards.push(card);
    localStorage.setItem('cards', JSON.stringify(cards));
    this.updateCardsForCol(cards, true);
  };

  addCard = (nameArg, descriptionArg, colIdArg) => {
    const card = {
      id: this.maxId(this.state.cards) + 1, // maxId
      autor: this.state.actualUser,
      nameCard: nameArg,
      descriptionCard: descriptionArg,
      colId: colIdArg,
    };
    const cardsLocal = [{ ...this.state.cards, card }];
    localStorage.setItem('cards', JSON.stringify(cardsLocal));
    this.setState({
      cards: cardsLocal,
    });
  };

  editCard = (id, name, description) => {
    const cardsLocal = { ...this.state.cards }.map(elem => {
      if (elem.id === id) {
        // elem.nameCard = name;
        // elem.descriptionCard = description;
        return { ...elem, nameCard: name, descriptionCard: description };
      }
      return elem;
    });
    localStorage.setItem('cards', JSON.stringify(cardsLocal));
    this.setState({
      cards: cardsLocal,
    });
  };

  deleteCard = id => {
    // const { cards } = { ...this.state };
    const cardsLocal = { ...this.state.cards }.filter(elem => {
      if (elem.id !== id) {
        return elem;
      }
      return null;
    });
    localStorage.setItem('cards', JSON.stringify(cardsLocal));
    this.updateCardsForCol(cardsLocal, true);
  };
  // _______________________________________________________________________________________

  // Column

  editNameCol = (id, nameArg) => {
    const columnsLocal = { ...this.state.columns }.map(elem => {
      if (elem.id === id) {
        return { ...elem, name: nameArg };
      }
      return elem;
    });
    localStorage.setItem('columns', JSON.stringify(columnsLocal));
    this.setState({
      columns: columnsLocal,
    });
  };
  // ____________________________________________________________________________________

  // Comments

  addComment = (textArg, idCardArg) => {
    const comment = {
      id: this.maxId(this.state.comments),
      idCard: idCardArg,
      autor: this.state.actualUser,
      text: textArg,
    };
    const commentsLocal = { ...this.state.comments, comment };
    localStorage.setItem('comments', JSON.stringify(commentsLocal));
  };

  deleteComment = id => {
    const commentsLocal = { ...this.state.comments }.filter(elem => {
      if (elem.id !== id) {
        return elem;
      }
      return null;
    });
    localStorage.setItem('comments', JSON.stringify(commentsLocal));
    this.setState({ comments: commentsLocal });
  };

  editComment = (id, textArg) => {
    const commentsLocal = { ...this.state.comments }.map(elem => {
      if (elem.id !== id) {
        return { ...elem, text: textArg };
      }
      return elem;
    });
    localStorage.setItem('comments', JSON.stringify(commentsLocal));
    this.setState({ comments: commentsLocal });
  };
  // ____________________________________________________________________________________

  render() {
    let content = null;
    if (this.state.newUser) {
      content = <NewUser updateUsers={this.updateUsers} updateActualUser={this.updateActualUser} />;
    } else {
      content = null;
    }
    return (
      <div className="App">
        <Header exitUser={this.Exit} name={this.state.actualUser.name} />
        {content}
        <Main
          users={this.state.users}
          actualUser={this.state.actualUser}
          cards={this.state.cards}
          columns={this.state.columns}
          addCard={this.addCard}
          editCard={this.editCard}
          deleteCard={this.deleteCard}
          addComment={this.addComment}
          editComment={this.editComment}
          deleteComment={this.deleteComment}
          editNameCol={this.editNameCol}
          addUser={this.addUser}
        />
      </div>
    );
  }
}

export default App;
