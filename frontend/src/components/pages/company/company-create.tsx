import { Company } from '@/interfaces/company';
import { createCompanyApi } from '@/services/company';
import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';
import { useState, useTransition } from 'react';
import { useNavigate } from 'react-router';
import { CompanyForm } from '../../organisms/company-form';

export default function CompanyCreatePage() {
	const [creating, startCreate] = useTransition();
	const [errors, setErrors] = useState<Record<string, string[]>>();
	const navigate = useNavigate();

	const onSubmit = (data: Company) => {
		startCreate(async () => {
			const { status, message, errors, data: company } = await createCompanyApi(data);
			if (status === 'SUCCESS') {
				addToast({
					color: 'success',
					description: 'Empresa creada correctamente',
				});
				navigate(`/companies/${company?.nit}`);
			} else {
				setErrors(errors);
				addToast({
					color: 'danger',
					description: message || 'Error al crear la empresa',
				});
			}
		});
	};

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>crear empresa</h1>
			</div>

			<CompanyForm id='company-form-create' onSubmit={onSubmit} validationErrors={errors} />

			<Button
				color='primary'
				size='lg'
				form='company-form-create'
				type='submit'
				isDisabled={creating}
				isLoading={creating}
			>
				Crear Empresa
			</Button>
		</div>
	);
}
