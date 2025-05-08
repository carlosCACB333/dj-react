import { User } from '@/interfaces/user';
import { fetchApi } from '@/libs/fetch';
import { createAppAsyncThunk } from '@/store/with-types';
import { FetchApiResponse } from '@/types';
import { LoginRes } from './types';

export const loginApi = createAppAsyncThunk<
	LoginRes,
	Partial<User>,
	{ rejectValue: FetchApiResponse<LoginRes> }
>('auth/login', async (data, { rejectWithValue }) => {
	try {
		const response = await fetchApi<LoginRes>(`/auth/sign-in/`, {
			method: 'POST',
			body: JSON.stringify(data),
		});

		if (response.status !== 'SUCCESS') {
			return rejectWithValue(response);
		}

		return response.data!;
	} catch (error) {
		return rejectWithValue({
			status: 'FAILED',
			message: error instanceof Error ? error.message : String(error),
		});
	}
});

export const tokenVerifyApi = createAppAsyncThunk<
	User,
	string,
	{ rejectValue: FetchApiResponse<{ user: User }> }
>('auth/validateToken', async (token, { rejectWithValue }) => {
	try {
		const response = await fetchApi<{
			user: User;
		}>(`/auth/token/verify/`, {
			method: 'POST',
			body: JSON.stringify({ token }),
		});

		if (response.status !== 'SUCCESS') {
			return rejectWithValue(response);
		}

		return response.data!.user;
	} catch (error) {
		return rejectWithValue({
			status: 'FAILED',
			message: error instanceof Error ? error.message : String(error),
		});
	}
});
