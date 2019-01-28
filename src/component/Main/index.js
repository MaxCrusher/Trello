import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import Column from './Column';
import './index.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      CardsForCol: [],
      cards: [],
      maxId: 0,
    };
  }

  render() {
    const column = this.state.CardsForCol.map((elem, i) => (
      <Col xs={12} sm={6} md={6} lg={3} className="col_margin" key={i}>
        <Column
          id={i + 1}
          name={this.state.columns[i]}
          cards={elem}
          editNameCol={this.props.editNameCol}
          deleteCard={this.props.deleteCard}
          actualUser={this.props.actualUser}
          updateCards={this.props.updateCardsAll}
          maxIdCard={this.state.maxId}
          editCard={this.props.editCard}
          addCard={this.props.addCard}
          addComment={this.props.addComment}
          editComment={this.props.editComment}
          deleteComment={this.props.deleteComment}
        />
      </Col>
    ));
    return (
      <div className="mainBlock">
        <Container>
          <Row>{column}</Row>
        </Container>
      </div>
    );
  }
}
export default Main;

Main.propTypes = {
  actualUser: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,

  addComment: PropTypes.func.isRequired,
  className: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  updateCards: PropTypes.func.isRequired,
  editNameCol: PropTypes.func.isRequired,
  updateCardsAll: PropTypes.func.isRequired,
};
