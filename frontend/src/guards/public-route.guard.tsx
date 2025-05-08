import { useAppSelector } from '@/store/hooks';
import { Spinner } from '@heroui/spinner';
import { Navigate, Outlet } from 'react-router';

export const PublicRouteGuard = () => {
	const { isChecking, user } = useAppSelector((state) => state.auth);
	if (isChecking) return <Spinner label='Verificando sesión' />;
	if (user) return <Navigate to='/' />;
	return <Outlet />;
};
