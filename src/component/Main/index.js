import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Column from './Column'

import  './Column'
import './index.css'

let maxId = 0
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: this.props.columns,
            CardsForCol1:[],
            CardsForCol2:[],
            CardsForCol3:[],
            CardsForCol4:[],
            cards: [],
            maxId: 0
        }
    }
    componentWillMount(){
        if(this.props.cards !== 'null') {
            //let allCards = JSON.parse(localStorage.getItem('cards'))
            //console.log(allCards+ '+')
            this.setState({
                cards: this.props.cards,
                // сортируем по коллоннам
                CardsForCol1: this.sort(1, this.props.cards),
                CardsForCol2: this.sort(2, this.props.cards),
                CardsForCol3: this.sort(3, this.props.cards),
                CardsForCol4: this.sort(4, this.props.cards),

            }, this.maxId(maxId))
        }
    }
    sort(id, cards){
        return(
            cards.filter((elem)=>{
                maxId < elem.id ? maxId = elem.id : maxId = maxId
                return elem.colId === id
            })
        )
    }
    updateCardsAll = (card) => {
        let { cards } = this.state
        cards.push(card)
        localStorage.setItem('cards', JSON.stringify(cards))
        this.setState({ cards: cards },
            this.setState({
                CardsForCol1: this.sort(1, this.state.cards),
                CardsForCol2: this.sort(2, this.state.cards),
                CardsForCol3: this.sort(3, this.state.cards),
                CardsForCol4: this.sort(4, this.state.cards),
            }, this.maxId(maxId))
        )
    }
    maxId = (max) => {
        this.setState({maxId: max})
    }
    render(){
        console.log("main")
        return(
            <div className='mainBlock'>
            <Container>
                <Row>
                    <Col><Column name={this.state.columns[0]} cards={this.state.CardsForCol1} updateCards = {this.updateCardsAll} maxIdCard = {this.state.maxId}/></Col>
                    <Col><Column name={this.state.columns[1]} cards={this.state.CardsForCol2} updateCards = {this.updateCardsAll} maxIdCard = {this.state.maxId}/></Col>
                    <Col><Column name={this.state.columns[2]} cards={this.state.CardsForCol3} updateCards = {this.updateCardsAll} maxIdCard = {this.state.maxId}/></Col>
                    <Col><Column name={this.state.columns[3]} cards={this.state.CardsForCol4} updateCards = {this.updateCardsAll} maxIdCard = {this.state.maxId}/></Col>
                </Row>
            </Container>
            </div>
        )
    }
}
export default Main