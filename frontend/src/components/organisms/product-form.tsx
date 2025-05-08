import { Company } from '@/interfaces/company';
import { Product } from '@/interfaces/product';
import { predictProductPriceApi } from '@/services/product';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { NumberInput, NumberInputProps } from '@heroui/number-input';
import { Select, SelectItem, SelectSection } from '@heroui/select';
import { addToast } from '@heroui/toast';
import { useRef, useState, useTransition } from 'react';
interface Props {
	id: string;
	product?: Product;
	onSubmit?: (data: Product) => void;
	validationErrors?: Record<string, string[]>;
	companies: Company[];
	predict?: boolean;
}

export const ProductForm = ({
	product,
	validationErrors,
	id,
	onSubmit,
	companies,
	predict = false,
}: Props) => {
	const [selectedCompany, setSelectedCompany] = useState(new Set([product?.company?.nit!]));
	const nameRef = useRef<HTMLInputElement>(null);
	const featuresRef = useRef<HTMLTextAreaElement>(null);
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
				ref={nameRef}
				variant='bordered'
				defaultValue={product?.name}
				label='Nombre del producto'
				name='name'
				placeholder='Producto 123'
			/>

			<Textarea
				ref={featuresRef}
				variant='bordered'
				defaultValue={product?.features}
				label='Características'
				name='features'
				placeholder='Características del producto'
			/>

			<PredictInput
				predict={predict}
				nameRef={nameRef}
				featuresRef={featuresRef}
				currency='USD'
				defaultValue={product?.price_usd ? Number(product.price_usd) : 0}
				label='Precio(USD)'
				name='price_usd'
				placeholder='0.00'
			/>
			<PredictInput
				predict={predict}
				nameRef={nameRef}
				featuresRef={featuresRef}
				currency='EUR'
				defaultValue={product?.price_eur ? Number(product.price_eur) : 0}
				label='Precio(EUR)'
				name='price_eur'
				placeholder='0.00'
			/>
			<PredictInput
				predict={predict}
				nameRef={nameRef}
				featuresRef={featuresRef}
				currency='PEN'
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

interface PredictInputProps extends NumberInputProps {
	currency: string;
	nameRef: React.RefObject<HTMLInputElement | null>;
	featuresRef: React.RefObject<HTMLTextAreaElement | null>;
	predict: boolean;
}

const PredictInput = ({
	nameRef,
	featuresRef,
	currency,
	defaultValue,
	predict,
	...props
}: PredictInputProps) => {
	const [price, setPrice] = useState(defaultValue);
	const [predditing, startPredict] = useTransition();
	const handlePredict = () => {
		const name = nameRef.current?.value;
		const features = featuresRef.current?.value;
		if (!name || !features) {
			addToast({
				color: 'danger',
				description: 'Por favor complete el nombre y la descripción',
			});
			return;
		}
		startPredict(async () => {
			const { status, message, data } = await predictProductPriceApi({
				name: name,
				features: features,
				currency,
			});

			if (status !== 'SUCCESS') {
				addToast({
					color: 'danger',
					description: message,
				});
				return;
			}
			setPrice(Number(data?.predicted_price.toFixed(2)) || 0);
		});
	};
	return (
		<>
			<NumberInput
				variant='bordered'
				value={price}
				onValueChange={setPrice}
				endContent={
					predict && (
						<div>
							<Button
								color='primary'
								size='sm'
								type='button'
								onPress={handlePredict}
								isLoading={predditing}
								isDisabled={predditing}
							>
								Obtener sugerencia del precio
							</Button>
						</div>
					)
				}
				{...props}
			/>
		</>
	);
};

export default PredictInput;
