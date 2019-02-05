import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Comment from '../Comment';
import * as action from '../../../../actions';
import maxId from '../../../maxId';
import '../index.css';

class ModalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nameValue: this.props.name,
      descriptionValue: this.props.description,
      comment: '',
    };
  }

  addComment = () => {
    const comment = {
      id: maxId(this.props.comments) + 1,
      idCard: this.props.id,
      text: this.state.comment,
      autor: this.props.actualUser,
    };
    this.props.addComment(comment);
    this.setState({ comment: '' });
  };

  handeleChangeCard = event => {
    if (event.target.id === 'nameCard') {
      this.setState({ nameValue: event.target.value });
    } else {
      this.setState({ descriptionValue: event.target.value });
    }
  };

  handeleChange = event => {
    this.setState({ comment: event.target.value });
  };

  Delete = () => {
    if (this.props.autorCard.id === this.props.actualUser.id) {
      this.props.deleteCard(this.props.id);
      this.props.toggle();
    } else alert('you cannot delete card');
  };

  editCard = () => {
    this.props.editCard(this.props.id, this.state.nameValue, this.state.descriptionValue);
    this.props.toggle();
  };

  render() {
    let propertyInput = true;
    if (this.props.actualUser.name === this.props.autorCard.name) {
      propertyInput = false;
    } else propertyInput = true;
    const comments = this.props.comments.map(elem => (
      <Comment
        key={elem.id + elem.autor}
        text={elem.text}
        autor={elem.autor}
        autorCard={this.props.autorCard.name}
        id={elem.id}
      />
    ));
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.toggle}>
          <Input
            plaintext={true}
            readOnly={propertyInput}
            id="nameCard"
            onChange={this.handeleChangeCard}
            value={this.state.nameValue}
          />
        </ModalHeader>
        <ModalBody>
          <Label>Type: {this.props.column.name}</Label>
          <br />
          <Label>Description: </Label>
          <Input
            plaintext={true}
            readOnly={propertyInput}
            id="descriptionCard"
            onChange={this.handeleChangeCard}
            value={this.state.descriptionValue}
          />
          <br />
          <Label>Autor: {this.props.autorCard.name}</Label>
          <br />
          <div className="buttons_left">
            <Button className="button" color="primary" onClick={this.editCard}>
              Edit
            </Button>
            <Button color="secondary" onClick={this.Delete}>
              Delete
            </Button>
          </div>
        </ModalBody>

        <ModalFooter className="footModal">
          <Label>Comments: </Label>
          <div className="newCommentBlock">
            <Label className="autorComment">{this.props.actualUser.name}</Label>
            <Input
              type="text"
              placeholder="comment"
              id="comment"
              onChange={this.handeleChange}
              value={this.state.comment}
            />
          </div>
          <Button color="success" onClick={this.addComment}>
            Add Comment
          </Button>
        </ModalFooter>
        <ModalFooter className="footModal">{comments}</ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  actualUser: state.actualUser.actualUser,
});

const mapDispatchToProps = {
  editCard: action.editCard,
  deleteCard: action.deleteCard,
  addComment: action.addComment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalCard);

ModalCard.propTypes = {
  toggle: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,

  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,

  autorCard: PropTypes.object.isRequired,
  actualUser: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,

  isOpen: PropTypes.bool.isRequired,

  comments: PropTypes.array.isRequired,

  id: PropTypes.number.isRequired,
};
