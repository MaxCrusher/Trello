import * as actionType from '../action-type';

const initialState = { users: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_USER: {
      const newUsers = state.users.concat({ id: action.user.id, name: action.user.name });
      const newState = { ...state, users: newUsers };
      return newState;
    }
    default:
      return state;
  }
};
