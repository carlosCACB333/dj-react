import { Company } from '@/interfaces/company';
import { Product } from '@/interfaces/product';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { NumberInput } from '@heroui/number-input';
import { Select, SelectItem, SelectSection } from '@heroui/select';
import { useState } from 'react';
interface Props {
	id: string;
	product?: Product;
	onSubmit?: (data: Product) => void;
	validationErrors?: Record<string, string[]>;
	companies: Company[];
}

export const ProductForm = ({ product, validationErrors, id, onSubmit, companies }: Props) => {
	const [selectedCompany, setSelectedCompany] = useState(new Set([product?.company?.nit!]));

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries()) as any as Product;
		onSubmit?.({ ...data, company_id: selectedCompany.values().next().value });
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
				defaultValue={product?.code}
				label='Código'
				name='code'
				placeholder='product-123'
			/>

			<Input
				variant='bordered'
				defaultValue={product?.name}
				label='Nombre del producto'
				name='name'
				placeholder='Producto 123'
			/>

			<Textarea
				variant='bordered'
				defaultValue={product?.features}
				label='Características'
				name='features'
				placeholder='Características del producto'
			/>

			<NumberInput
				variant='bordered'
				defaultValue={product?.price_usd ? Number(product.price_usd) : 0}
				label='Precio(USD)'
				name='price_usd'
				placeholder='0.00'
			/>
			<NumberInput
				variant='bordered'
				defaultValue={product?.price_eur ? Number(product.price_eur) : 0}
				label='Precio(EUR)'
				name='price_eur'
				placeholder='0.00'
			/>
			<NumberInput
				variant='bordered'
				defaultValue={product?.price_pen ? Number(product.price_pen) : 0}
				label='Precio(PEN)'
				name='price_pen'
				placeholder='0.00'
			/>

			<Select
				variant='bordered'
				disallowEmptySelection
				selectedKeys={selectedCompany}
				onSelectionChange={setSelectedCompany as any}
				label='Empresa'
				name='company_id'
				placeholder='Seleccione una empresa'
				className='w-full'
			>
				<SelectSection>
					{companies.map((company) => (
						<SelectItem key={company.nit}>{company.name}</SelectItem>
					))}
				</SelectSection>
			</Select>
		</Form>
	);
};
