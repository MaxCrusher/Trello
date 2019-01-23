import React, { Component } from 'react';
import './index.css'

class NameCol extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <div className='blockForNameCol'>
                {this.props.name}
            </div>
        )
    }
}
export default NameCol