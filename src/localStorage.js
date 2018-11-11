export const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  console.log(state);
  localStorage.setItem('state-miguel', serializedState);
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state-miguel');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};