import { Product } from '@/interfaces/product';
import { fetchApi } from '@/libs/fetch';

export const updateProductApi = async (id: string, data: Partial<Product>) => {
	const response = await fetchApi<Product>(`/products/${id}/`, {
		method: 'PUT',
		body: JSON.stringify(data),
	});

	return response;
};

export const createProductApi = async (data: Partial<Product>) => {
	const response = await fetchApi<Product>(`/products/`, {
		method: 'POST',
		body: JSON.stringify(data),
	});

	return response;
};

export const deleteProductApi = async (id: string) => {
	const response = await fetchApi<Product>(`/products/${id}/`, {
		method: 'DELETE',
	});

	return response;
};

export const predictProductPriceApi = async (data: {
	name: string;
	features: string;
	currency: string;
}) => {
	const response = await fetchApi<{
		predicted_price: number;
	}>(`/products/predict-price`, {
		method: 'POST',
		body: JSON.stringify(data),
	});

	return response;
};
