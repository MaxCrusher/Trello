import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import Comment from '../Comment';
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
    this.props.addComment(this.state.comment, this.props.id);
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

  editComment = (id, text) => {
    this.props.editComment(id, text, this.props.id);
  };

  editCard = () => {
    this.props.editCard(this.props.id, this.state.nameValue, this.state.descriptionValue);
    this.props.toggle();
  };

  deleteComment = id => {
    this.props.deleteComment(id);
  };

  render() {
    console.log(this.props, 'modalcard');
    let propertyInput = true;
    if (this.props.actualUser.name === this.props.autorCard.name) {
      propertyInput = false;
    } else propertyInput = true;
    const comments = this.props.comments.map(elem => {
      if (elem.idCard === this.props.id) {
        return (
          <Comment
            key={elem.id + elem.autor}
            text={elem.text}
            autor={elem.autor}
            autorCard={this.props.autorCard.name}
            actualUser={this.props.actualUser}
            id={elem.id}
            editComment={this.props.editComment}
            deleteComment={this.props.deleteComment}
          />
        );
      }
      return null;
    });
    return (
      <Modal isOpen={this.props.isOpen} className={this.props.className}>
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
export default ModalCard;
ModalCard.propTypes = {
  addComment: PropTypes.func.isRequired,
  className: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  numComments: PropTypes.func.isRequired,

  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  colName: PropTypes.string.isRequired,
  autorCard: PropTypes.string.isRequired,

  isOpen: PropTypes.bool.isRequired,

  actualUser: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  autor: PropTypes.object.isRequired,

  id: PropTypes.number.isRequired,
};
