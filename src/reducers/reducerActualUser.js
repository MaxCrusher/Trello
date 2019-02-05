import * as actionType from '../action-type';

const initialState = { actualUser: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.UPDATE_ACTUAL_USER: {
      const newState = { ...state, actualUser: action.user };
      return newState;
    }
    default:
      return state;
  }
};
