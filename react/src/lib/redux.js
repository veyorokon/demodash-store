//Helper functions for redux

const destruct = (obj, ...keys) =>
  keys.reduce((a, c) => ({...a, [c]: obj[c]}), {});

export function mapStateToProps(state, fields) {
  return destruct(state, ...fields);
}
