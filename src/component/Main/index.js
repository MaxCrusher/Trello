import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Column from './Column';
import './index.css';

class Main extends Component {
  render() {
    const column = this.props.columns.map((elem, i) => (
      <Col xs={12} sm={6} md={6} lg={3} className="col_margin" key={i}>
        <Column
          id={elem.id}
          name={elem.name}
          cards={this.props.CardsForCol[i]}
          column={elem}
          comments={this.props.comments}
          actualUser={this.props.actualUser}
          deleteCard={this.props.deleteCard}
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
const mapStateToProps = state => ({
  columns: state.columns.columns,
});
export default connect(mapStateToProps)(Main);

Main.propTypes = {
  actualUser: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  CardsForCol: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,

  addComment: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editNameCol: PropTypes.func.isRequired,
};
