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

  render() {
    return (
      <div className="MyCard" onKeyDown={this.closeEsc}>
        <Card className="MyCard">
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardText> {this.props.column.name} </CardText>
            <CardText> Autor: {this.props.autor.name} </CardText>
            <CardText> {this.props.description} </CardText>
            <CardText>Comments: {this.props.comments.length}</CardText>
            <Button color="danger" onClick={this.toggle}>
              Open
            </Button>
          </CardBody>
        </Card>
        <ModalCard
          isOpen={this.state.modal}
          id={this.props.id}
          name={this.props.name}
          description={this.props.description}
          column={this.props.column}
          comments={this.props.comments}
          autorCard={this.props.autor}
          toggle={this.toggle}
        />
      </div>
    );
  }
}

export default MyCard;

MyCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,

  comments: PropTypes.array.isRequired,

  column: PropTypes.object.isRequired,
  autor: PropTypes.object.isRequired,

  id: PropTypes.number.isRequired,
};
