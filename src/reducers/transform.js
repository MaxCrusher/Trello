import { createTransform } from 'redux-persist';

const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  inboundState =>
    // convert mySet to an Array.
    ({ ...inboundState, mySet: [...inboundState.mySet] }),
  // transform state being rehydrated
  outboundState =>
    // convert mySet back to a Set.
    ({ ...outboundState, mySet: new Set(outboundState.mySet) }),
  // define which reducers this transform gets called for.
  { whitelist: ['someReducer'] },
);

export default SetTransform;
