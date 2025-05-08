import { useSWR } from '@/hooks/use-wsr';
import { Company } from '@/interfaces/company';
import { fetchApi } from '@/libs/fetch';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table';
import { EditIcon } from 'lucide-react';
import { Link } from 'react-router';
export default function CompanyPage() {
	const { user } = useAppSelector((state) => state.auth);
	const { isLoading, data = [] } = useSWR('/companies', (url) => fetchApi<Company[]>(url));
	if (isLoading) return <Spinner />;

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Empresas</h1>
				{user?.role === 'admin' && (
					<Button as={Link} to='/companies/create' color='primary'>
						Crear Empresa
					</Button>
				)}
			</div>
			<Table aria-label='Tabla de Empresas'>
				<TableHeader>
					<TableColumn>NIT</TableColumn>
					<TableColumn>Nombre</TableColumn>
					<TableColumn>Teléfono</TableColumn>
					<TableColumn>Dirección</TableColumn>
					<TableColumn className='w-8'>Opciones</TableColumn>
				</TableHeader>
				<TableBody>
					{data.map((company) => (
						<TableRow key={company.nit}>
							<TableCell>{company.nit}</TableCell>
							<TableCell>{company.name}</TableCell>
							<TableCell>{company.phone}</TableCell>
							<TableCell>{company.address}</TableCell>
							<TableCell>
								{user?.role === 'admin' && (
									<div className='flex gap-2'>
										<Button
											isIconOnly
											size='md'
											as={Link}
											to={`/companies/${company.nit}`}
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
		</div>
	);
}
