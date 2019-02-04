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
        <Column id={elem.id} name={elem.name} column={elem} />
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
  // columns: state.columns.columns.map(col => ({...col, cards: state.cards.cards.filter()})),
  columns: state.columns.columns,
});
export default connect(mapStateToProps)(Main);

Main.propTypes = {
  columns: PropTypes.array.isRequired,
};
