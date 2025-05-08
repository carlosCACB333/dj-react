import { logout } from '@/store/features/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from '@heroui/dropdown';
import { Building, ClipboardList, LogIn, LogOut, Package, Palette } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { ThemeSwitch } from './theme-switch';

export const UserMenu = () => {
	const { isChecking, user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSignOut = () => {
		dispatch(logout());
	};

	const handleSignIn = () => {
		navigate('/auth/sign-in');
	};

	return (
		<div className='flex items-center gap-4'>
			{!isChecking && !user && (
				<Button color='primary' as={Link} to='/auth/sign-in' variant='shadow'>
					Iniciar Sessión{' '}
				</Button>
			)}
			<Dropdown showArrow placement='bottom-end' radius='sm' isDisabled={isChecking}>
				<DropdownTrigger>
					<Avatar className='cursor-pointer' name={user?.first_name || ''} />
				</DropdownTrigger>
				<DropdownMenu aria-label='user menu' disabledKeys={['avatar']}>
					{user ? (
						<DropdownSection aria-label='private'>
							<DropdownItem
								key='avatar'
								isReadOnly
								className='opacity-100'
								textValue='avatar'
							>
								<div className='flex gap-2'>
									<Avatar name={user.first_name!} />
									<div>
										<p className='font-bold'>{user.email}</p>
										<p className='text-tiny capitalize'>{user.email}</p>
									</div>
								</div>
							</DropdownItem>
						</DropdownSection>
					) : null}

					<DropdownSection aria-label='private and public'>
						<DropdownItem
							key='companies'
							onPress={() => navigate('/companies')}
							startContent={<Building />}
						>
							Empresas
						</DropdownItem>

						<DropdownItem
							key='products'
							onPress={() => navigate('/products')}
							startContent={<Package />}
						>
							Productos
						</DropdownItem>

						<DropdownItem
							key='inventory'
							onPress={() => navigate('/inventory')}
							startContent={<ClipboardList />}
						>
							Inventario
						</DropdownItem>

						<DropdownItem
							key='theme'
							isReadOnly
							className='opacity-100'
							startContent={<Palette />}
							endContent={<ThemeSwitch />}
						>
							Tema
						</DropdownItem>

						{user ? (
							<DropdownItem
								key='sign-out'
								startContent={<LogOut />}
								color='danger'
								onPress={handleSignOut}
							>
								Cerrar sessión
							</DropdownItem>
						) : (
							<DropdownItem
								key='sign-in'
								startContent={<LogIn />}
								onPress={handleSignIn}
							>
								Iniciar sesión
							</DropdownItem>
						)}
					</DropdownSection>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};
