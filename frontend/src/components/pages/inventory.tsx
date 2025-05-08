import { envs } from '@/config/envs';
import { useSWR } from '@/hooks/use-wsr';
import { Product } from '@/interfaces/product';
import { fetchApi } from '@/libs/fetch';
import { sendProductEmailApi } from '@/services/inventory';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Spinner } from '@heroui/spinner';
import { addToast } from '@heroui/toast';
import { useTransition } from 'react';
import { ProductsTable } from '../organisms/products-table';

export default function CompanyPage() {
	const [sending, startSend] = useTransition();
	const { isLoading, data = [] } = useSWR('/products', (url) => fetchApi<Product[]>(url));
	if (isLoading) return <Spinner />;

	const handleSendEmail = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string;
		if (!email) return;

		startSend(async () => {
			const { status, message } = await sendProductEmailApi(email);
			addToast({
				color: status === 'SUCCESS' ? 'success' : 'danger',
				description: message,
			});
		});
	};

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Opciones de Inventario</h1>
			</div>

			<ProductsTable products={data} />

			<div className='flex items-center justify-between'>
				<Button
					color='primary'
					size='lg'
					as='a'
					href={envs.CORE_API_URL + '/products/pdf'}
					target='_blank'
				>
					Descargar pdf
				</Button>

				<form onSubmit={handleSendEmail} className='flex gap-2'>
					<Input size='lg' type='email' name='email' placeholder='Correo' />
					<Button
						color='primary'
						size='lg'
						className=''
						type='submit'
						isDisabled={sending}
						isLoading={sending}
					>
						Enviar pdf a correo
					</Button>
				</form>
			</div>
		</div>
	);
}
