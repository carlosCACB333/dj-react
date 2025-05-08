import { useSWR } from '@/hooks/use-wsr';
import { Product } from '@/interfaces/product';
import { fetchApi } from '@/libs/fetch';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import { Link } from 'react-router';
import { ProductsTable } from '../organisms/products-table';
export default function ProductPage() {
	const { user } = useAppSelector((state) => state.auth);
	const { isLoading, data = [] } = useSWR('/products', (url) => fetchApi<Product[]>(url));
	if (isLoading) return <Spinner />;

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Productos</h1>
				{user?.role === 'admin' && (
					<Button as={Link} to='/products/create' color='primary'>
						Crear Producto
					</Button>
				)}
			</div>
			<ProductsTable products={data} />
		</div>
	);
}
