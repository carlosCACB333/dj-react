import { envs } from '@/config/envs';
import { useSWR } from '@/hooks/use-wsr';
import { Product } from '@/interfaces/product';
import { fetchApi } from '@/libs/fetch';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import { useTransition } from 'react';
import { ProductsTable } from '../organisms/products-table';

export default function CompanyPage() {
	const [dowloading, startDownload] = useTransition();
	const { isLoading, data = [] } = useSWR('/products', (url) => fetchApi<Product[]>(url));
	if (isLoading) return <Spinner />;

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Opciones de Inventario</h1>
			</div>

			<ProductsTable products={data} />

			<Button
				color='primary'
				size='lg'
				as='a'
				href={envs.CORE_API_URL + '/products/pdf'}
				target='_blank'
			>
				Descargar pdf
			</Button>
		</div>
	);
}
