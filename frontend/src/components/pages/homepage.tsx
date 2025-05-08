import { Building, ClipboardList, Package } from 'lucide-react';
import { Link } from 'react-router';

export default function HomePage() {
	return (
		<div className='container mx-auto py-10'>
			<div className='flex flex-col items-center justify-center space-y-8 text-center'>
				<h1 className='text-4xl font-bold tracking-tight'>Enterprise Management System</h1>
				<p className='text-muted-foreground max-w-2xl text-lg'>
					Una plataforma completa para la gestión de empresas, productos e inventario con
					tecnologías avanzadas de IA y Blockchain.
				</p>

				<div className='mt-8 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3'>
					<FeatureCard
						title='Empresas'
						description='Gestiona la información de tus empresas'
						icon={<Building className='h-8 w-8' />}
						href='/companies'
					/>
					<FeatureCard
						title='Productos'
						description='Administra los productos por empresa'
						icon={<Package className='h-8 w-8' />}
						href='/products'
					/>
					<FeatureCard
						title='Inventario'
						description='Visualiza y exporta el inventario'
						icon={<ClipboardList className='h-8 w-8' />}
						href='/inventory'
					/>
				</div>
			</div>
		</div>
	);
}

function FeatureCard({
	title,
	description,
	icon,
	href,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
	href: string;
}) {
	return (
		<Link
			to={href}
			className='flex flex-col items-center justify-center rounded-lg border p-4 shadow-md transition-transform hover:scale-105'
		>
			<div className='mb-4'>{icon}</div>
			<h2 className='text-xl font-semibold'>{title}</h2>
			<p className='text-muted-foreground'>{description}</p>
		</Link>
	);
}
