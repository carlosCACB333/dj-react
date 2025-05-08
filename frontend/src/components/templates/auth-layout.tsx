import { Outlet } from 'react-router';

export default function AuthLayout() {
	return (
		<div className='flex flex-grow items-center justify-center'>
			<Outlet />
		</div>
	);
}
