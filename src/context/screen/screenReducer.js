import { CHANGE_SCREEN } from "../types";

const handlers = {
  [CHANGE_SCREEN]: ({ id }) => id,
  DEFAULT: state => state
};

export const screenreducer = (state, { type, id }) => {
  const handler = handlers[type] || handlers.DEFAULT;
  return handler({ id });
};
