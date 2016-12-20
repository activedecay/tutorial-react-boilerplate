export const id = x => x;
export const join = (m) => {
  return m.chain(id);
};
