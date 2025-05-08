import SWR from 'swr';

export const useSWR = <T>(url: string, fetcher: (url: string) => Promise<T>) => {
	const { data = {} as T, error, isLoading, isValidating, mutate } = SWR(url, fetcher);
	return {
		...data,
		error,
		isLoading,
		isValidating,
		mutate,
	};
};
