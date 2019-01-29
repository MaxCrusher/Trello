import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';
import ModalCard from './ModalCard';
import './index.css';

class MyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nameValue: this.props.name,
      descriptionValue: this.props.description,
      comment: '',
      numComments: 0,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handeleChange = event => {
    if (event.target.id === 'nameCard') {
      this.setState({ nameValue: event.target.value });
    } else if (event.target.id === 'descriptionCard') {
      this.setState({ descriptionValue: event.target.value });
    } else this.setState({ comment: event.target.value });
  };

  closeEsc = event => {
    if (event.keyCode === 27) {
      this.setState({
        modal: false,
      });
    }
  };

  numComments = (commentsArg, idCard) => {
    const mas = commentsArg.filter(elem => elem.idCard === idCard);
    return mas.length;
  };

  render() {
    return (
      <div className="MyCard" onKeyDown={this.closeEsc}>
        <Card className="MyCard">
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardText> {this.props.column.name} </CardText>
            <CardText> Autor: {this.props.autor.name} </CardText>
            <CardText> {this.props.description} </CardText>
            <CardText>Comments: {this.numComments(this.props.comments, this.props.id)}</CardText>
            <Button color="danger" onClick={this.toggle}>
              Open
            </Button>
          </CardBody>
        </Card>
        <div>{this.props.children}</div>
        <ModalCard
          isOpen={this.state.modal}
          id={this.props.id}
          name={this.props.name}
          description={this.props.description}
          column={this.props.column}
          comments={this.props.comments}
          addComment={this.props.addComment}
          editComment={this.props.editComment}
          deleteComment={this.props.deleteComment}
          editCard={this.props.editCard}
          deleteCard={this.props.deleteCard}
          autorCard={this.props.autor}
          actualUser={this.props.actualUser}
          toggle={this.toggle}
          numComments={this.numComments}
        />
      </div>
    );
  }
}
export default MyCard;

MyCard.propTypes = {
  addComment: PropTypes.func.isRequired,
  className: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,

  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),

  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  colName: PropTypes.string.isRequired,

  isOpen: PropTypes.bool.isRequired,

  actualUser: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  autor: PropTypes.object.isRequired,

  id: PropTypes.number.isRequired,
};
