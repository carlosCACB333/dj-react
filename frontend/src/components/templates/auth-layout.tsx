import { useAppSelector } from '@/store/hooks';
import { Spinner } from '@heroui/spinner';
import { Navigate, Outlet } from 'react-router';

export default function AuthLayout() {
	const { isChecking, user } = useAppSelector((state) => state.auth);
	if (isChecking) return <Spinner label='Verificando sesión' />;

	if (user) {
		return <Navigate to='/' />;
	}

	return (
		<div className='flex flex-grow items-center justify-center'>
			<Outlet />
		</div>
	);
}
