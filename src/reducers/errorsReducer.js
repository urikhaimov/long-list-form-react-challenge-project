export const errorsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROW_ERRORS':
      return {
        ...state,
        [action.index]: {
          invalidFields: action.payload.invalidFields,
          emptyFields: action.payload.emptyFields,
        },
      };

    case 'REMOVE_ROW_ERRORS':
      const newState = { ...state };
      delete newState[action.index];
      return newState;

    case 'RESET_ALL_ERRORS':
      return {};

    default:
      return state;
  }
};

export const initialErrors = {};
