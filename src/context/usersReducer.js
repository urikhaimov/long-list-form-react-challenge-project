export const usersReducer = (state, action) => {
  switch (action.type) {
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

    // no changes needed to other actions
    
  }
};
