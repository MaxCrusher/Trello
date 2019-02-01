import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

import AddCardModal from './AddCardModal';
import NameCol from './NameCol';
import MyCard from '../MyCard';

import './index.css';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      valueNameCard: '',
      valueDescCard: '',
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
    this.blur();
  };

  blur = () => {
    const mas = document.getElementsByClassName('butAdd');
    Array.from(mas).forEach(elem => {
      elem.blur();
    });
  };

  inputChange = event => {
    if (event.target.id === 'nameCardCol') {
      this.setState({ valueNameCard: event.target.value });
    } else this.setState({ valueDescCard: event.target.value });
  };

  render() {
    const cards = this.props.cards.map(elem => (
      <MyCard
        key={elem.id + elem.nameCard}
        id={elem.id}
        name={elem.nameCard}
        actualUser={this.props.actualUser}
        autor={elem.autor}
        description={elem.descriptionCard}
        column={this.props.column}
        comments={this.props.comments}
        deleteCard={this.props.deleteCard}
        editCard={this.props.editCard}
        addCard={this.props.addCard}
        addComment={this.props.addComment}
        editComment={this.props.editComment}
        deleteComment={this.props.deleteComment}
      />
    ));
    return (
      <div className="blockForTask">
        <NameCol name={this.props.name} id={this.props.id} />
        {cards}
        <Button className="butAdd" id="butAdd" size="sm" color="success" onClick={this.toggle} block>
          {' '}
          Add Card
        </Button>
        <AddCardModal modal={this.state.modal} addCard={this.props.addCard} id={this.props.id} toggle={this.toggle} />
      </div>
    );
  }
}
export default Column;

Column.propTypes = {
  addComment: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editNameCol: PropTypes.func.isRequired,

  name: PropTypes.string.isRequired,
  column: PropTypes.object.isRequired,

  actualUser: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,

  id: PropTypes.number.isRequired,
};
