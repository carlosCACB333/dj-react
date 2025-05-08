'use client';

import { signUpApi } from '@/services/auth';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Link } from '@heroui/link';
import { addToast } from '@heroui/toast';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Page() {
	const [isVisible, setIsVisible] = useState(false);
	const [errors, setErrors] = useState<Record<string, string[]>>();
	const toggleVisibility = () => setIsVisible(!isVisible);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries());
		const { status, message, errors } = await signUpApi(data);

		if (status === 'SUCCESS') {
			addToast({
				color: 'success',
				description: 'Usuario creado correctamente',
			});
			navigate('/auth/sign-in');
		} else {
			addToast({
				color: 'danger',
				description: message || 'Error al crear el usuario',
			});
			setErrors(errors);
		}
		setLoading(false);
	};

	return (
		<>
			<div className='flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small'>
				<div className='flex flex-col gap-1'>
					<h1 className='text-large font-medium'>Crea una cuenta</h1>
					<p className='text-small text-default-500'>para continuar en Acme</p>
				</div>

				<Form
					className='flex flex-col gap-3'
					onSubmit={handleSubmit}
					validationErrors={errors}
				>
					<Input
						label='Nombres'
						placeholder='carlos'
						variant='bordered'
						name='first_name'
					/>
					<Input
						label='Apellidos'
						placeholder='perez'
						variant='bordered'
						name='last_name'
					/>

					<Input
						label='Correo Electrónico'
						placeholder='hello@example.com'
						type='email'
						name='email'
						variant='bordered'
					/>
					<Input
						endContent={
							<button type='button' onClick={toggleVisibility}>
								{isVisible ? <EyeOff /> : <EyeIcon />}
							</button>
						}
						label='Contraseña'
						placeholder='****'
						type={isVisible ? 'text' : 'password'}
						variant='bordered'
						name='password'
					/>

					<Input
						endContent={
							<button type='button' onClick={toggleVisibility}>
								{isVisible ? <EyeOff /> : <EyeIcon />}
							</button>
						}
						label='Confirmar Contraseña'
						placeholder='****'
						type={isVisible ? 'text' : 'password'}
						variant='bordered'
						name='confirm_password'
					/>

					<Button
						className='w-full'
						color='primary'
						type='submit'
						isLoading={loading}
						isDisabled={loading}
					>
						Crear Cuenta
					</Button>
				</Form>
				<div className='flex items-center gap-4 py-2'>
					<Divider className='flex-1' />
					<p className='shrink-0 text-tiny text-default-500'>O</p>
					<Divider className='flex-1' />
				</div>

				<p className='text-center text-small'>
					¿Ya tienes una cuenta?&nbsp;
					<Link href={'/auth/sign-in'} size='sm'>
						Iniciar sesión
					</Link>
				</p>
			</div>
		</>
	);
}
