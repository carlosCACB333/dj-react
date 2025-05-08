import { Button } from '@heroui/button';
import { Link } from 'react-router';

export const NotFound = () => {
	return (
		<div className='flex flex-grow flex-col items-center justify-center text-center'>
			<h1 className='text-5xl font-bold'>404</h1>
			<p className='mt-4 text-lg'>Página no encontrada</p>
			<p className='mt-2 text-gray-500'>
				Lo sentimos, la página que estás buscando no existe.
			</p>
			<Button color='primary' size='lg' className='mt-4' as={Link} to='/'>
				Regresar a la página principal
			</Button>
		</div>
	);
};
