import { LOCAL_STORAGE_ACCESS_TOKEN } from '@/config/constants';
import { envs } from '@/config/envs';
import { FetchApiResponse, Status } from '@/types';
import { getLocalStorage } from '@/utils/localstorage';

export type FetchApi = <T>(
	url: string,
	options?: Omit<RequestInit, 'headers'> & { headers?: Record<string, string> },
) => Promise<FetchApiResponse<T>>;

export const fetchApi: FetchApi = async (url, options = {}) => {
	try {
		const { headers, ...rest } = options;
		const full_url = envs.CORE_API_URL + url;

		let Authorization = headers?.Authorization;
		if (!Authorization) {
			const token = getLocalStorage<string>(LOCAL_STORAGE_ACCESS_TOKEN);
			Authorization = token ? `Bearer ${token}` : undefined;
		}

		const isForm = options.body instanceof FormData;

		const full_options: RequestInit = {
			headers: {
				...(!isForm && { 'Content-Type': 'application/json' }),
				...(Authorization && { Authorization }),
				...headers,
			},
			...rest,
		};

		const reqMethod = full_options?.method || 'GET';
		console.info(reqMethod, full_url, full_options);

		const response = await fetch(full_url, full_options);

		const json = response.headers.get('Content-Type')?.includes('application/json')
			? await response.json()
			: {};

		const statuscode = response.status;

		console.info('[RESPONSE]', statuscode, json);

		let status: Status = 'FAILED';
		let message = json.detail || 'Ocurrio un error inesperado';

		if (statuscode >= 200 && statuscode < 300 && json.errorCode !== 1) {
			status = 'SUCCESS';
		}

		if (statuscode === 401) {
			status = 'UNAUTHORIZED';
			message = message || 'Necesitas iniciar sesión para ver este recurso';
		}

		if (statuscode === 403) {
			status = 'FORBIDDEN';
			message = message || 'No tienes permiso para ver este recurso';
		}

		if (statuscode === 409) {
			status = 'CONFLICT';
			message = message || 'Conflicto detectado en la solicitud';
		}

		return {
			status,
			message,
			data: status === 'SUCCESS' ? json : undefined,
			errors: status !== 'SUCCESS' ? json : undefined,
		};
	} catch (e) {
		return {
			status: 'FAILED',
			message: 'Internal server error',
		};
	}
};
