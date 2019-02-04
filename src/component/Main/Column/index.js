import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    const cards = this.props.cards.map(elem => {
      if (elem.idCol === this.props.id) {
        return (
          <MyCard
            key={elem.id}
            id={elem.id}
            name={elem.name}
            autor={elem.autor}
            description={elem.description}
            column={this.props.column}
          />
        );
      }
      return null;
    });
    return (
      <div className="blockForTask">
        <NameCol name={this.props.name} id={this.props.id} />
        {cards}
        <Button className="butAdd" id="butAdd" size="sm" color="success" onClick={this.toggle} block>
          {' '}
          Add Card
        </Button>
        <AddCardModal modal={this.state.modal} id={this.props.id} toggle={this.toggle} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  actualUser: state.actualUser.actualUser,
  cards: state.cards.cards,
});
export default connect(mapStateToProps)(Column);

Column.propTypes = {
  name: PropTypes.string.isRequired,
  column: PropTypes.object.isRequired,

  actualUser: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,

  id: PropTypes.number.isRequired,
};
