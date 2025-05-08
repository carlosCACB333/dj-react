import { User } from '@/interfaces/user';
import { fetchApi } from '@/libs/fetch';

export const signUpApi = async (data: Partial<User>) => {
	const response = await fetchApi<User>(`/auth/sign-up`, {
		method: 'POST',
		body: JSON.stringify(data),
	});

	return response;
};
