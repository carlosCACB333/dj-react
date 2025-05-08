import { useSWR } from '@/hooks/use-wsr';
import { Company } from '@/interfaces/company';
import { fetchApi } from '@/libs/fetch';
import { deleteCompanyApi, updateCompanyApi } from '@/services/company';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import { addToast } from '@heroui/toast';
import { useTransition } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CompanyForm } from '../../organisms/company-form';
export default function CompanyDetailsPage() {
	const { id } = useParams();
	const [updating, startUpdate] = useTransition();
	const [deleting, startDelete] = useTransition();
	const { isLoading, data } = useSWR('/companies/' + id, (url) => fetchApi<Company>(url));
	const navigate = useNavigate();

	if (isLoading) return <Spinner />;

	const handleUpdate = (data: Company) => {
		startUpdate(async () => {
			const { status, message } = await updateCompanyApi(id!, data);
			if (status === 'SUCCESS') {
				addToast({
					color: 'success',
					description: 'Empresa editada correctamente',
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
			const { status, message } = await deleteCompanyApi(id!);
			if (status === 'SUCCESS') {
				addToast({
					color: 'success',
					description: 'Empresa eliminada correctamente',
				});
				navigate('/companies');
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
				<h1 className='text-2xl font-bold'>Detalles de la empresa</h1>

				<Button
					color='danger'
					onPress={handleDelete}
					isLoading={deleting}
					isDisabled={deleting}
				>
					Eliminar Empresa
				</Button>
			</div>

			<CompanyForm company={data} id='company-form-edit' onSubmit={handleUpdate} />

			<Button
				color='primary'
				size='lg'
				form='company-form-edit'
				type='submit'
				isDisabled={updating}
				isLoading={updating}
			>
				Editar Empresa
			</Button>
		</div>
	);
}
