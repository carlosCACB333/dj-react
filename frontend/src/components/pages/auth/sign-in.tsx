'use client';

import { loginApi } from '@/store/features/auth/auth-api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Alert } from '@heroui/alert';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export default function Page() {
	const [isVisible, setIsVisible] = useState(false);
	const { loading, error, errors } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries());
		dispatch(loginApi(data));
	};

	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<>
			<div className='flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small'>
				<div className='flex flex-col gap-1'>
					<h1 className='text-large font-medium'>Inicia sesión en tu cuenta</h1>
					<p className='text-small text-default-500'>para continuar en Acme</p>
				</div>

				{error && <Alert color='danger'>{error}</Alert>}

				<Form
					onSubmit={handleSubmit}
					className='flex flex-col gap-3'
					validationErrors={errors}
				>
					<Input
						label='Correo Electrónico'
						name='email'
						placeholder='hello@example.com'
						type='email'
						variant='bordered'
					/>
					<Input
						endContent={
							<button type='button' onClick={toggleVisibility}>
								{isVisible ? <EyeOff /> : <EyeIcon />}
							</button>
						}
						label='Contraseña'
						name='password'
						placeholder='****'
						type={isVisible ? 'text' : 'password'}
						variant='bordered'
					/>
					<div className='flex w-full items-center justify-between px-1 py-2'>
						<Link className='text-default-500' to='#'>
							¿Olvidaste tu contraseña?
						</Link>
					</div>
					<Button
						className='w-full'
						color='primary'
						isDisabled={loading}
						isLoading={loading}
						type='submit'
					>
						Iniciar sesión
					</Button>
				</Form>
				<div className='flex items-center gap-4 py-2'>
					<Divider className='flex-1' />
					<p className='shrink-0 text-tiny text-default-500'>O</p>
					<Divider className='flex-1' />
				</div>

				<p className='text-center text-small'>
					¿Necesitas crear una cuenta?&nbsp;
					<Link to='/auth/sign-up' className='text-primary'>
						Crear
					</Link>
				</p>
			</div>
		</>
	);
}
