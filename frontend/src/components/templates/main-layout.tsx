import { Outlet } from 'react-router';
import { Navbar } from '../organisms/navbar';

export default function MainLayout() {
	return (
		<div className='relative flex min-h-dvh flex-col'>
			<Navbar />
			<div className='container mx-auto flex flex-grow flex-col space-y-4 px-6 pt-4'>
				<Outlet />
			</div>
			<footer className='flex w-full items-center justify-center py-3'>
				<p className='text-sm text-default-500'>
					© {new Date().getFullYear()} Todos los derechos reservados.
				</p>
			</footer>
		</div>
	);
}
