export const selectIsSignedIn = (state) => state.auth.isSignedIn;
export const selectUserData = (state) => state.auth.userData;
export const selectLoading = (state) => state.auth.loading;
export const selectAccountError = (state) => state.auth.error;
export const selectUserName = (state) => state.auth.user.name;
export const selectUserEmail = (state) => state.auth.user.email;
