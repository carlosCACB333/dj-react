import { useAppSelector } from '@/store/hooks';
import { Spinner } from '@heroui/spinner';
import { Navigate, Outlet } from 'react-router';

export const PrivateRouteGuard = () => {
	const { isChecking, user } = useAppSelector((state) => state.auth);
	if (isChecking) return <Spinner label='Verificando sesión' />;
	if (!user) return <Navigate to='/auth/sign-in' />;
	return <Outlet />;
};
