import * as actionType from '../action-type';

const initialState = { actualUser: {} };

const modifidedActiualUser = (state = initialState, action) => {
  switch (action.type) {
    case actionType.UPDATE_ACTUAL_USER: {
      const newState = { ...state, actualUser: action.user };
      return newState;
    }
    default:
      return state;
  }
};
export default modifidedActiualUser;
