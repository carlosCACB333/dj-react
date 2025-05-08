import { LOCAL_STORAGE_ACCESS_TOKEN } from '@/config/constants';
import { tokenVerifyApi } from '@/store/features/auth/auth-api';
import { setIsChecking } from '@/store/features/auth/auth-slice';
import { useAppDispatch } from '@/store/hooks';
import { getLocalStorage } from '@/utils/localstorage';
import { useTheme } from '@heroui/use-theme';
import { useEffect } from 'react';

export const useInitApp = () => {
	useTheme();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const token = getLocalStorage<string>(LOCAL_STORAGE_ACCESS_TOKEN);
		if (!token) {
			dispatch(setIsChecking(false));
			return;
		}
		dispatch(tokenVerifyApi(token));
	}, []);
};
