import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      credentials: {},
      user: {},
      ID_Perfil_to_modify: {},
    },
    reducers: {
      userLogin: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      userLogout: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      updateUser: (state, action) => {
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload
          }
        }
      }
    }
});

export const { userLogin, userLogout, updateUser } = userSlice.actions;
export const userDate = (state) => state.user;
export default userSlice.reducer;