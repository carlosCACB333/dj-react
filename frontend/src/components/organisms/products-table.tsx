import { Product } from '@/interfaces/product';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@heroui/button';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table';
import { EditIcon } from 'lucide-react';
import { Link } from 'react-router';

interface Props {
	products: Product[];
}

export const ProductsTable = ({ products }: Props) => {
	const { user } = useAppSelector((state) => state.auth);
	return (
		<Table aria-label='Tabla de productos'>
			<TableHeader>
				<TableColumn>Código</TableColumn>
				<TableColumn>Nombre</TableColumn>
				<TableColumn>Características</TableColumn>
				<TableColumn>Empresa</TableColumn>
				<TableColumn>Precio(USD)</TableColumn>
				<TableColumn>Precio(EUR)</TableColumn>
				<TableColumn>Precio(PEN)</TableColumn>
				<TableColumn className='w-8'>Opciones</TableColumn>
			</TableHeader>
			<TableBody>
				{products.map((product) => (
					<TableRow key={product.code}>
						<TableCell>{product.code}</TableCell>
						<TableCell>{product.name}</TableCell>
						<TableCell>{product.features}</TableCell>
						<TableCell>{product.company.name}</TableCell>
						<TableCell>{product.price_usd}</TableCell>
						<TableCell>{product.price_eur}</TableCell>
						<TableCell>{product.price_pen}</TableCell>
						<TableCell>
							{user?.role === 'admin' && (
								<div className='flex gap-2'>
									<Button
										isIconOnly
										size='md'
										as={Link}
										to={`/products/${product.id}`}
									>
										<EditIcon />
									</Button>
								</div>
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
