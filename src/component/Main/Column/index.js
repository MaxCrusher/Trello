import React, { Component } from 'react';
import { Button } from 'reactstrap';

import NameCol from './NameCol';
import MyCard from '../MyCard'

import './index.css'

class Column extends Component {
    constructor(props) {
        super(props)

    }

    render(){
        return(
            <div className='blockForTask'>
                <NameCol name={this.props.name}/>
                <MyCard testPropsForCard={this.props.testPropsForCard}/>
                <Button size='sm' color="success" block>Add Card</Button>
            </div>
        )
    }
}
export default Column