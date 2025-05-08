import { fetchApi } from '@/libs/fetch';

export const sendProductEmailApi = async (email: string) => {
	const response = await fetchApi(`/products/pdf/send`, {
		method: 'POST',
		body: JSON.stringify({
			email,
		}),
	});

	return response;
};
