import { createReducer } from '@reduxjs/toolkit';

export const userReducers = createReducer(
  {},
  {
    registerRequest: state => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAutenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    registerail: (state, action) => {
      state.loading = false;
      state.isAutenticated = false;
      state.error = action.payload;
    },
    loginRequest: state => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAutenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAutenticated = false;
      state.error = action.payload;
    },

    logOutRequest: state => {
      state.loading = true;
    },
    logOutSuccess: (state, action) => {
      state.loading = false;
      state.isAutenticated = false;
      state.user = null;
      state.message = action.payload;
    },
    logOutFail: (state, action) => {
      state.loading = false;
      state.isAutenticated = true;
      state.error = action.payload;
    },
    loadUserRequest: state => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAutenticated = true;
      state.user = action.payload;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAutenticated = false;
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);

export const ProfileReducers = createReducer(
  {},
  {
    updateProfileRequest: state => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    changePasswordRequest: state => {
      state.loading = true;
    },
    changePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    changePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    forgetPasswordRequest: state => {
        state.loading = true;
      },
      forgetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      forgetPasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      resetPasswordRequest: state => {
        state.loading = true;
      },
      resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      resetPasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    updateProfilePicRequest: state => {
      state.loading = true;
    },
    updateProfilePicSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProfilePicFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeToPlaylistRequest:(state)=>{
      state.loading=true
  },
  removeToPlaylistSuccess:(state,action)=>{
      state.loading=false;
      state.message=action.payload

  },
  removeToPlaylistFail:(state,action)=>{
      state.loading=false;
      state.error=action.payload
  },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
