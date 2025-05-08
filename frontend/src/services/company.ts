import { Company } from '@/interfaces/company';
import { fetchApi } from '@/libs/fetch';

export const updateCompanyApi = async (id: string, data: Partial<Company>) => {
	const response = await fetchApi<Company>(`/companies/${id}/`, {
		method: 'PUT',
		body: JSON.stringify(data),
	});

	return response;
};

export const createCompanyApi = async (data: Partial<Company>) => {
	const response = await fetchApi<Company>(`/companies/`, {
		method: 'POST',
		body: JSON.stringify(data),
	});

	return response;
};

export const deleteCompanyApi = async (id: string) => {
	const response = await fetchApi<Company>(`/companies/${id}/`, {
		method: 'DELETE',
	});

	return response;
};
