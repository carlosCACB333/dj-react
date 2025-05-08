import { Logo } from '@/icons/logo';
import { Navbar as HeroUINavbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Link } from 'react-router';
import { UserMenu } from './user-menu';

export const Navbar = () => {
	return (
		<HeroUINavbar maxWidth='2xl' position='sticky'>
			<NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
				<NavbarBrand className='max-w-fit'>
					<Link to='/' className='flex items-center gap-3'>
						<Logo />
						<p className='line-clamp-1 text-wrap text-xl font-bold'>EMS</p>
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className='hidden md:flex' justify='center'>
				<NavbarItem className=''>
					<Link to='/companies' className='text-sm font-medium'>
						Empresas
					</Link>
				</NavbarItem>
				<NavbarItem className=''>
					<Link to='/products' className='text-sm font-medium'>
						Productos
					</Link>
				</NavbarItem>
				<NavbarItem className=''>
					<Link to='/inventory' className='text-sm font-medium'>
						Inventario
					</Link>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className='' justify='end'>
				<NavbarItem className=''>
					<UserMenu />
				</NavbarItem>
			</NavbarContent>
		</HeroUINavbar>
	);
};
