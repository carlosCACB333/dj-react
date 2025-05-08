import { LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_REFRESH_TOKEN } from '@/config/constants';
import { User } from '@/interfaces/user';
import { clearLocalStorage, setLocalStorage } from '@/utils/localstorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginApi, tokenVerifyApi } from './auth-api';
interface authState {
	isChecking: boolean;
	loading: boolean;
	user?: User;
	error?: string;
	errors?: Record<string, string[]>;
}

const initialState: authState = {
	isChecking: true,
	loading: false,
};

export const authSlice = createSlice({
	name: 'auth	',
	initialState,
	reducers: {
		logout: () => {
			clearLocalStorage();
			return { ...initialState, isChecking: false };
		},
		setIsChecking: (state, action: PayloadAction<boolean>) => {
			state.isChecking = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginApi.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.errors = undefined;
			})
			.addCase(loginApi.fulfilled, (state, action) => {
				setLocalStorage(LOCAL_STORAGE_ACCESS_TOKEN, action.payload.access);
				setLocalStorage(LOCAL_STORAGE_REFRESH_TOKEN, action.payload.refresh);
				state.loading = false;
				state.user = action.payload.user;
			})
			.addCase(loginApi.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message;
				state.errors = action.payload?.errors;
			})
			.addCase(tokenVerifyApi.pending, (state) => {
				state.isChecking = true;
				state.error = undefined;
				state.errors = undefined;
			})
			.addCase(tokenVerifyApi.fulfilled, (state, action) => {
				state.isChecking = false;
				state.user = action.payload;
			})
			.addCase(tokenVerifyApi.rejected, (state, action) => {
				setLocalStorage(LOCAL_STORAGE_ACCESS_TOKEN, undefined);
				setLocalStorage(LOCAL_STORAGE_REFRESH_TOKEN, undefined);
				state.isChecking = false;
				state.error = action.payload?.message;
				state.errors = action.payload?.errors;
			});
	},
});

export const authReducer = authSlice.reducer;

export const { logout, setIsChecking } = authSlice.actions;
