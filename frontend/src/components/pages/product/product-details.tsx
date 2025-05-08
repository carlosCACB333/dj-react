import { useSWR } from '@/hooks/use-wsr';
import { Company } from '@/interfaces/company';
import { Product } from '@/interfaces/product';
import { fetchApi } from '@/libs/fetch';
import { deleteProductApi, updateProductApi } from '@/services/product';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import { addToast } from '@heroui/toast';
import { useTransition } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ProductForm } from '../../organisms/product-form';

const fetchData = async (url: string) => {
	const [res1, res2] = await Promise.all([
		fetchApi<Product>(url),
		fetchApi<Company[]>('/companies'),
	]);

	return {
		companies: res2.data || [],
		product: res1.data,
	};
};

export default function ProductDetailsPage() {
	const { id } = useParams();
	const [updating, startUpdate] = useTransition();
	const [deleting, startDelete] = useTransition();
	const { isLoading, companies, product } = useSWR('/products/' + id, fetchData);
	const navigate = useNavigate();

	if (isLoading) return <Spinner />;

	const handleUpdate = (data: Product) => {
		startUpdate(async () => {
			const { status, message } = await updateProductApi(id!, data);
			if (status === 'SUCCESS') {
				addToast({
					color: 'success',
					description: 'Producto editado correctamente',
				});
			} else {
				addToast({
					color: 'danger',
					description: message,
				});
			}
		});
	};

	const handleDelete = () => {
		startDelete(async () => {
			const { status, message } = await deleteProductApi(id!);
			if (status === 'SUCCESS') {
				addToast({
					color: 'success',
					description: 'Producto eliminado correctamente',
				});
				navigate('/products');
			} else {
				addToast({
					color: 'danger',
					description: message,
				});
			}
		});
	};

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Detalles de del producto</h1>

				<Button
					color='danger'
					onPress={handleDelete}
					isLoading={deleting}
					isDisabled={deleting}
				>
					Eliminar Producto
				</Button>
			</div>

			<ProductForm
				product={product}
				companies={companies}
				id='product-form-edit'
				onSubmit={handleUpdate}
			/>

			<Button
				color='primary'
				size='lg'
				form='product-form-edit'
				type='submit'
				isDisabled={updating}
				isLoading={updating}
			>
				Editar Producto
			</Button>
		</div>
	);
}
