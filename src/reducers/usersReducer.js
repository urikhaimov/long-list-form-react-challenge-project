// src/reducers/usersReducer.js

const STORAGE_KEY = 'usersData';

export const initialState = {
  users: [],
  loading: true,
};

export const usersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload, loading: false };
    case 'ADD_USER':
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user, index) =>
          index === action.index ? action.payload : user
        ),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((_, index) => index !== action.index),
      };
    case 'INIT_USERS':
      const localData = JSON.parse(localStorage.getItem('users'));
      return {
        ...state,
        users: localData || action.payload,
        loading: false,
      };

    case 'SAVE_USERS':
      localStorage.setItem('users', JSON.stringify(state.users));
      return {
        ...state,
        originalUsers: [...state.users],
      };
    case 'UPDATE_USER_BY_ID':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id
            ? { ...user, [action.payload.field]: action.payload.value }
            : user
        )
      };
    default:
      return state;

  }
};
