const maxId = masInState => {
  let max = 0;
  if (masInState.length === 0) {
    max = 0;
  } else {
    max = masInState[masInState.length - 1].id;
  }
  return max;
};
export default maxId;
