import * as actionType from '../action-type';

const initialState = { comments: [] };

const modifidedComments = (state = initialState, action) => {
  console.log(action, 'comments');
  switch (action.type) {
    case actionType.ADD_COMMENT: {
      const newComment = state.comments.concat(action.comment);
      const newState = { ...state, comments: newComment };
      return newState;
    }
    case actionType.DELETE_COMMENT: {
      const newComments = state.comments.filter(elem => elem.id !== action.id);
      const newState = { ...state, comments: newComments };
      return newState;
    }
    case actionType.EDIT_COMMENT: {
      const newComments = state.comments.map(elem => {
        if (elem.id === action.id) {
          return { ...elem, text: action.text };
        }
        return elem;
      });
      const newState = { ...state, comments: newComments };
      return newState;
    }
    default:
      return state;
  }
};

export default modifidedComments;
