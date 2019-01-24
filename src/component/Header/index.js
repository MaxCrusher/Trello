import React, { Component } from 'react';

import { Button } from 'reactstrap';
import './index.css'

class Header extends Component {

    constructor(props){
        super(props)

    }
    Exit = () => {
        localStorage.removeItem('actualUser')
        this.props.exitUser()
    }
    render(){
        return(
            <div className='header'>
                <h1>TRELLO!!!</h1>
                <label>{this.props.colName}</label>
                <Button onClick={this.Exit}> Exit </Button>
            </div>
        )
    }
}
export default Header