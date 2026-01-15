import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
  user: { name: string; email: string } | null;
}

const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
const storedRole = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

const initialState: AuthState = {
  isAuthenticated: !!storedToken,
  token: storedToken,
  role: storedRole,
  user: storedUser ? JSON.parse(storedUser) : null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userlogin: (
      state,
      action: PayloadAction<{ token: string; role: string; user: { name: string; email: string } }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.user = action.payload.user;

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('role', action.payload.role);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      state.user = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
      }
    },
  },
});

export const { userlogin, logout } = authSlice.actions;
export default authSlice.reducer;
