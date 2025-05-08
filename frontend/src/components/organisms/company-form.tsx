import { Company } from '@/interfaces/company';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';

interface Props {
	id: string;
	company?: Company;
	onSubmit?: (data: Company) => void;
	validationErrors?: Record<string, string[]>;
}

export const CompanyForm = ({ company, validationErrors, id, onSubmit }: Props) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries()) as any as Company;
		onSubmit?.(data);
	};

	return (
		<Form
			onSubmit={handleSubmit}
			id={id}
			className='flex flex-col gap-3'
			validationErrors={validationErrors}
		>
			<Input
				variant='bordered'
				defaultValue={company?.nit}
				label='NIT'
				name='nit'
				placeholder='123456789'
			/>

			<Input
				variant='bordered'
				defaultValue={company?.name}
				label='Nombre de la empresa'
				name='name'
				placeholder='Acme S.A.S'
			/>

			<Input
				variant='bordered'
				defaultValue={company?.phone}
				label='Teléfono'
				name='phone'
				placeholder='1234567890'
			/>
			<Input
				variant='bordered'
				defaultValue={company?.address}
				label='Dirección'
				name='address'
				placeholder='Calle 123 #45-67'
			/>
		</Form>
	);
};
