import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Column from './Column'

import  './Column'
import './index.css'

class Main extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <div className='mainBlock'>
            <Container>
                <Row>
                    <Col><Column name={'TODO'} testPropsForCard={1}/></Col>
                    <Col><Column name={'In Progress'} testPropsForCard={2}/></Col>
                    <Col><Column name={'Testing'} testPropsForCard={3}/></Col>
                    <Col><Column name={'Done'} testPropsForCard={4}/></Col>
                </Row>
            </Container>
            </div>
        )
    }
}
export default Main