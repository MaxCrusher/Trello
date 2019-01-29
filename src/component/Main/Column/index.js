import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

import NameCol from './NameCol';
import MyCard from '../MyCard';

import './index.css';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      modal: false,
      valueNameCard: '',
      valueDescCard: '',
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  addCard = () => {
    if (this.state.valueDescCard !== '' && this.state.valueNameCard !== '') {
      this.toggle();
      this.props.addCard(this.state.valueNameCard, this.state.valueDescCard, this.props.id);
      this.setState({ valueNameCard: '', valueDescCard: '' });
    } else alert('Checking forms');
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
        <NameCol name={this.props.name} id={this.props.id} editNameCol={this.props.editNameCol} />
        {cards}
        <Button size="sm" color="success" onClick={this.toggle} block>
          {' '}
          Add Card
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>New Card</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="nameCardCol">Name Card</Label>
                <Input
                  type="text"
                  id="nameCardCol"
                  placeholder="Name Card"
                  onChange={this.inputChange}
                  value={this.state.valueNameCard}
                />
              </FormGroup>
              <FormGroup>
                <Label for="descriptionCardCol">Description Card</Label>
                <Input
                  type="text"
                  id="descriptionCardCol"
                  placeholder="Description Card"
                  onChange={this.inputChange}
                  value={this.state.valueDescCard}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addCard}>
              OK
            </Button>{' '}
          </ModalFooter>
        </Modal>
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
