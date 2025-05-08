import { useSWR } from '@/hooks/use-wsr';
import { Company } from '@/interfaces/company';
import { Product } from '@/interfaces/product';
import { fetchApi } from '@/libs/fetch';
import { createProductApi } from '@/services/product';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import { addToast } from '@heroui/toast';
import { useState, useTransition } from 'react';
import { useNavigate } from 'react-router';
import { ProductForm } from '../../organisms/product-form';

export default function ProductCreatePage() {
	const { isLoading, data = [] } = useSWR('/companies', (url) => fetchApi<Company[]>(url));

	const [creating, startCreate] = useTransition();
	const [errors, setErrors] = useState<Record<string, string[]>>();
	const navigate = useNavigate();

	const onSubmit = (data: Product) => {
		startCreate(async () => {
			const { status, message, errors, data: product } = await createProductApi(data);
			if (status === 'SUCCESS') {
				addToast({
					color: 'success',
					description: 'Producto creado correctamente',
				});
				navigate(`/products/${product?.id}`);
			} else {
				setErrors(errors);
				addToast({
					color: 'danger',
					description: message || 'Error al crear la empresa',
				});
			}
		});
	};

	if (isLoading) return <Spinner />;

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>crear producto</h1>
			</div>

			<ProductForm
				companies={data}
				id='product-form-create'
				onSubmit={onSubmit}
				validationErrors={errors}
			/>

			<Button
				color='primary'
				size='lg'
				form='product-form-create'
				type='submit'
				isDisabled={creating}
				isLoading={creating}
			>
				Crear Producto
			</Button>
		</div>
	);
}
