import * as actionType from '../action-type';

const initialState = { cards: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_CARD: {
      const newCard = state.cards.concat(action.card);
      const newState = { ...state, cards: newCard };
      return newState;
    }
    case actionType.DELETE_CARD: {
      const newCards = state.cards.filter(elem => elem.id !== action.id);
      const newState = { ...state, cards: newCards };
      return newState;
    }
    case actionType.EDIT_CARD: {
      const newCards = state.cards.map(elem => {
        if (elem.id === action.id) {
          return { ...elem, name: action.name, description: action.description };
        }
        return elem;
      });
      const newState = { ...state, cards: newCards };
      return newState;
    }
    default:
      return state;
  }
};
